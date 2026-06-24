import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: 'private',
      addRandomSuffix: true,
    });

    // Return a proxy URL that serves the private blob through our API
    const proxyUrl = `/api/blob/${blob.pathname}`;

    return NextResponse.json({ success: true, url: proxyUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('Upload error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
