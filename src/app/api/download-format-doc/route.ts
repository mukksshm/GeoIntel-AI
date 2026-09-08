import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customName = searchParams.get('filename') || 'GeoIntel_AI_Research_Dossier_Template.docx';
    const cleanFilename = customName.endsWith('.docx') ? customName : `${customName}.docx`;

    const primaryPath = path.join(process.cwd(), 'trial doc format', 'GeoIntel_AI_Research_Dossier_Template.docx');
    const fallbackPath = path.join(process.cwd(), 'public', 'GeoIntel_AI_Research_Dossier_Template.docx');

    let fileBuffer: Buffer | null = null;
    if (fs.existsSync(primaryPath)) {
      fileBuffer = fs.readFileSync(primaryPath);
    } else if (fs.existsSync(fallbackPath)) {
      fileBuffer = fs.readFileSync(fallbackPath);
    }

    if (!fileBuffer) {
      return new NextResponse('Format document template not found', { status: 404 });
    }

    const uint8Array = new Uint8Array(fileBuffer);

    // Return the genuine OOXML .docx binary with proper headers
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${cleanFilename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error serving format doc:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
