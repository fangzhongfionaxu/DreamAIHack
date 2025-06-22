
-- Create a public bucket for avatars if it doesn't exist
insert into storage.buckets
  (id, name, public)
values
  ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Set up RLS policies for the avatars bucket
-- Allow public read access to everyone
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

-- Allow authenticated users to upload their own avatar
create policy "Authenticated users can upload an avatar."
  on storage.objects for insert
  to authenticated with check (
    bucket_id = 'avatars' and
    auth.uid() = (storage.foldername(name))[1]::uuid
  );
  
-- Allow authenticated users to update their own avatar
create policy "Authenticated users can update their own avatar."
  on storage.objects for update
  to authenticated with check (
    bucket_id = 'avatars' and
    auth.uid() = (storage.foldername(name))[1]::uuid
  );
