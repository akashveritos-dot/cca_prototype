/**
 * API Route: File Upload
 * POST /api/upload - Upload files (images, documents, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { createMedia } from '@/lib/db/queries';
import { validateFileUpload } from '@/lib/security/sanitize';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFileUpload(file.name, file.size);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = file.name.split('.').pop();
    const filename = `${timestamp}-${randomString}.${ext}`;

    // Determine file type folder
    let folder = 'files';
    if (file.type.startsWith('image/')) {
      folder = 'images';
    } else if (file.type.startsWith('video/')) {
      folder = 'videos';
    } else if (file.type === 'application/pdf' || file.type.includes('document')) {
      folder = 'documents';
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = join(uploadDir, filename);
    
    await writeFile(filePath, buffer);

    // Generate URL
    const fileUrl = `/uploads/${folder}/${filename}`;

    // Get image dimensions if it's an image
    let width: number | undefined = undefined;
    let height: number | undefined = undefined;
    
    if (file.type.startsWith('image/')) {
      // You can use sharp library here to get dimensions and optimize
      // For now, we'll leave it as undefined
    }

    // Save to database
    const mediaId = await createMedia({
      filename: filename,
      original_filename: file.name,
      file_path: filePath,
      file_url: fileUrl,
      file_type: folder,
      mime_type: file.type,
      file_size: file.size,
      width: width,
      height: height,
      folder: `/${folder}`,
      uploaded_by: 1, // TODO: Get from auth token
      status: 'active'
    });

    return NextResponse.json({
      success: true,
      data: {
        id: mediaId,
        filename: filename,
        original_filename: file.name,
        url: fileUrl,
        type: file.type,
        size: file.size
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}
