
// Supabase storage adapter - abstracts storage implementation
import { supabase } from "@/integrations/supabase/client";

export interface StorageUploadOptions {
  bucket: string;
  path: string;
  file: File;
  upsert?: boolean;
}

export interface StorageDownloadOptions {
  bucket: string;
  path: string;
}

export class StorageAdapter {
  static async upload({ bucket, path, file, upsert = false }: StorageUploadOptions) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert });

    if (error) throw new Error(`Upload failed: ${error.message}`);
    return data;
  }

  static async getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }

  static async download({ bucket, path }: StorageDownloadOptions) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);

    if (error) throw new Error(`Download failed: ${error.message}`);
    return data;
  }

  static async remove(bucket: string, paths: string[]) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove(paths);

    if (error) throw new Error(`Remove failed: ${error.message}`);
    return data;
  }
}
