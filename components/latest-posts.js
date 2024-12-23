import { getPosts } from '@/lib/posts';
import Posts from './posts';

export default async function LatestPosts() {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}
