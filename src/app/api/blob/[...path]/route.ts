import { get } from '@vercel/blob';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathname = path.join('/');

    const result = await get(pathname, { access: 'private' });

    if (!result || result.statusCode !== 200) {
      return new NextResponse('Not found', { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Blob proxy error:', error);
    return new NextResponse('Not found', { status: 404 });
  }
}
