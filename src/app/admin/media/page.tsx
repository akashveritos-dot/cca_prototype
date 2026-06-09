'use client';

/**
 * Media Library
 */

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setMedia(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        fetchMedia();
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this file?')) return;

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchMedia();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Media Library" description="Manage your media files" />

      {/* Upload Area */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow">
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer transition-colors">
            <input
              type="file"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
            <div className="text-4xl mb-2">📁</div>
            <p className="text-gray-600">
              {uploading ? 'Uploading...' : 'Click or drag files to upload'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports: Images, Videos, PDF, Documents
            </p>
          </div>
        </label>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item: any) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-2 group relative">
              <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-2">
                {item.mime_type?.startsWith('image/') ? (
                  <img
                    src={item.file_url}
                    alt={item.alt_text || item.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    📄
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 truncate">{item.filename}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && media.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No media files yet. Upload your first file!</p>
        </div>
      )}
    </div>
  );
}
