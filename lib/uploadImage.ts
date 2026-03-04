import { supabase } from './supabase';

const BUCKET = 'images';

/**
 * Upload an image file to Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadImage(
    file: File,
    folder: 'tours' | 'team' | 'gallery' = 'tours'
): Promise<string> {
    // Generate unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'webp';
    const timestamp = Date.now();
    const safeName = `${folder}/${timestamp}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(safeName, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type,
        });

    if (error) {
        console.error('Upload error:', error.message);
        throw new Error(`Ошибка загрузки: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(safeName);

    return urlData.publicUrl;
}

/**
 * Delete an image from Supabase Storage by its full URL.
 */
export async function deleteImage(publicUrl: string): Promise<void> {
    // Extract path from URL: https://xxx.supabase.co/storage/v1/object/public/images/tours/123.webp
    const match = publicUrl.match(/\/storage\/v1\/object\/public\/images\/(.+)$/);
    if (!match) return;

    const path = match[1];
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) console.error('Delete image error:', error.message);
}
