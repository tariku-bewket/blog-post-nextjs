'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';

export async function createPost(prvState, formData) {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];

  if (!title || title.trim() === '') {
    errors.push('Title is required');
  }

  if (!content || content.trim() === '') {
    errors.push('Content is required');
  }

  if (!image || image.size === 0) {
    errors.push('Image is required');
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      'Failed to fetch image from cloud. Please try again later.'
    );
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });

  revalidatePath('/', 'layout');
  redirect('/feed');
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/', 'layout');
}
