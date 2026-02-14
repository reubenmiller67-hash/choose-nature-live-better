import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getPostById,
  createPost,
  updatePost,
  uploadImage,
  TAGS,
} from '../../lib/posts';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function BlogPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Reuben Miller');
  const [published, setPublished] = useState(false);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const load = async () => {
        try {
          const post = await getPostById(id);
          if (post) {
            setTitle(post.title);
            setSlug(post.slug);
            setTag(post.tag);
            setImage(post.image || '');
            setExcerpt(post.excerpt || '');
            setContent(post.content || '');
            setAuthor(post.author || 'Reuben Miller');
            setPublished(post.published ?? false);
          }
        } catch (err) {
          console.error('Failed to load post:', err);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [isEdit, id]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEdit || !slug) {
      setSlug(slugify(value));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-10 w-10 border-4 border-[#22C55E] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#1B4332] text-white px-4 py-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl font-bold">
            {isEdit ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-friendly-name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            >
              <option value="">Select a tag</option>
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Featured Image</label>
            {image && (
              <div className="mb-3">
                <img
                  src={image}
                  alt="Preview"
                  className="max-w-xs h-40 object-cover rounded-lg border"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setImage(URL.createObjectURL(file));
                }
              }}
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="2-3 sentences for the blog listing page"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Write your blog post content here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={published}
              onClick={() => setPublished(!published)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                published ? 'bg-[#22C55E]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  published ? 'left-8' : 'left-1'
                }`}
              />
            </button>
            <span className="text-sm font-medium text-[#1A1A1A]">
              {published ? 'Published' : 'Draft'}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={async () => {
                console.log('SAVE CLICKED');
                console.log('Title:', title);
                console.log('Content:', content);

                if (!title.trim()) {
                  alert('Please enter a title');
                  return;
                }

                try {
                  setSaving(true);
                  setError('');
                  let imageUrl = image;
                  if (imageFile) {
                    imageUrl = await uploadImage(imageFile);
                  }
                  const postData = {
                    title,
                    slug: slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                    tag: tag || 'health',
                    image: imageUrl || '',
                    excerpt: excerpt || '',
                    content,
                    author: author || 'Reuben Miller',
                    published,
                  };
                  if (isEdit && id) {
                    await updatePost(id, postData);
                  } else {
                    await createPost(postData);
                  }
                  alert('Post saved!');
                  navigate('/admin/dashboard');
                } catch (err) {
                  console.error('Save error:', err);
                  alert('Error saving: ' + (err instanceof Error ? err.message : err));
                } finally {
                  setSaving(false);
                }
              }}
              disabled={saving}
              className="bg-[#22C55E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#16A34A] transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-[#1A1A1A] hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
