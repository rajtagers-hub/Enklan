import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });
    }

    // 1. If Vercel Blob token is configured, use it (production/cloud mode)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(file.name, file, {
          access: 'public',
          addRandomSuffix: true,
        });
        return NextResponse.json({ success: true, url: blob.url });
      } catch (blobErr) {
        console.error('Vercel Blob upload failed, trying local fallback:', blobErr);
      }
    }

    // 2. Local fallback: Save to public/uploads directory
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create a unique filename to prevent overwrites
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExt = path.extname(file.name);
      const baseName = path.basename(file.name, fileExt).replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${baseName}-${uniqueSuffix}${fileExt}`;

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);
      
      const fileUrl = `/uploads/${filename}`;
      console.log('Saved file locally to:', filePath, 'URL:', fileUrl);
      return NextResponse.json({ success: true, url: fileUrl });
    } catch (localErr) {
      console.error('Local fallback upload failed:', localErr);
      throw localErr;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('Upload error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
