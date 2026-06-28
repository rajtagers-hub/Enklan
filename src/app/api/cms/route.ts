import { put, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

const CMS_BLOB_PATH = 'cms-data.json';

export const dynamic = 'force-dynamic'; // Prevent Next.js from caching this route

export async function GET() {
  try {
    const { blobs } = await list({ prefix: CMS_BLOB_PATH });
    const cmsBlob = blobs.find(b => b.pathname === CMS_BLOB_PATH);
    
    if (!cmsBlob) {
      return NextResponse.json({ exists: false });
    }

    // Fetch the content of the blob
    const response = await fetch(cmsBlob.downloadUrl, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('Failed to fetch blob content');
    }
    const data = await response.json();

    return NextResponse.json({ exists: true, data }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Failed to get CMS data from blob:', error);
    return NextResponse.json({ exists: false, error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const dataString = JSON.stringify(body);
    
    const blob = await put(CMS_BLOB_PATH, dataString, {
      access: 'public', // Public access so it can be fetched easily via downloadUrl
      addRandomSuffix: false, // Overwrites the existing file
      contentType: 'application/json',
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Failed to save CMS data to blob:', error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
