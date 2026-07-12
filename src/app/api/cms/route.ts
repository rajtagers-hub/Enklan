import { put, list } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CMS_BLOB_PATH = 'cms-data.json';
const LOCAL_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'cms-data.json');

export const dynamic = 'force-dynamic'; // Prevent Next.js from caching this route

export async function GET() {
  try {
    // 1. Try local file first (highest priority for local development and shared local server)
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      try {
        const fileContent = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json({ exists: true, data }, {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        });
      } catch (err) {
        console.error('Failed to read local cms-data.json, falling back to blob:', err);
      }
    }

    // 2. Fall back to Vercel Blob if local file doesn't exist and token is present
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { blobs } = await list({ prefix: CMS_BLOB_PATH });
        const cmsBlob = blobs.find(b => b.pathname === CMS_BLOB_PATH);
        
        if (cmsBlob) {
          const response = await fetch(cmsBlob.downloadUrl + '?t=' + Date.now(), { cache: 'no-store' });
          if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ exists: true, data }, {
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
              }
            });
          }
        }
      } catch (blobErr) {
        console.error('Failed to fetch from Vercel Blob:', blobErr);
      }
    }

    return NextResponse.json({ exists: false });
  } catch (error) {
    console.error('Failed to get CMS data:', error);
    return NextResponse.json({ exists: false, error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dataString = JSON.stringify(body, null, 2);
    
    // 1. Always write to local file (so it persists locally on the dev server)
    try {
      const dir = path.dirname(LOCAL_DATA_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_DATA_PATH, dataString, 'utf-8');
      console.log('Successfully wrote CMS data to local file:', LOCAL_DATA_PATH);
    } catch (err) {
      console.error('Failed to write local cms-data.json:', err);
    }

    // 2. Save to Vercel Blob if token is present (for Vercel deployment)
    let blobUrl = '';
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(CMS_BLOB_PATH, dataString, {
          access: 'public',
          addRandomSuffix: false,
          contentType: 'application/json',
        });
        blobUrl = blob.url;
      } catch (blobErr) {
        console.error('Failed to save to Vercel Blob:', blobErr);
      }
    }

    return NextResponse.json({ success: true, url: blobUrl });
  } catch (error) {
    console.error('Failed to save CMS data:', error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
