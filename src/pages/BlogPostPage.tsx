import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BlogPost from '../components/blog/BlogPost';
import { getPostBySlug } from '../lib/posts';
import { blogPosts } from '../data/blogPosts';

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<{
    id: string;
    title: string;
    tag: string;
    author: string;
    date: string;
    image: string;
    excerpt: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const firestorePost = await getPostBySlug(id);
        if (firestorePost) {
          const d = firestorePost.createdAt instanceof Date
            ? firestorePost.createdAt
            : (firestorePost.createdAt as { toDate?: () => Date }).toDate?.();
          const dateStr = d ? d.toISOString().slice(0, 10) : '';
          setPost({
            id: firestorePost.id,
            title: firestorePost.title,
            tag: firestorePost.tag || '',
            author: firestorePost.author || 'Reuben Miller',
            date: dateStr,
            image: firestorePost.image || '/images/rm-image-1.webp',
            excerpt: firestorePost.excerpt || '',
            content: firestorePost.content || '',
          });
        } else {
          const hardcoded = blogPosts.find((p) => p.id === id);
          if (hardcoded) {
            setPost({
              ...hardcoded,
              tag: hardcoded.tag || '',
            });
          } else {
            setNotFound(true);
          }
        }
      } catch {
        const hardcoded = blogPosts.find((p) => p.id === id);
        if (hardcoded) {
          setPost({
            ...hardcoded,
            tag: hardcoded.tag || '',
          });
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="aspect-[16/10] bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <BlogPost post={post} />
      </div>
    </section>
  );
}
