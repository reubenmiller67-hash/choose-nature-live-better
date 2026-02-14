import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllPosts, deletePost, type Post } from '../../lib/posts';

function formatDate(date: Date | { toDate?: () => Date }) {
  const d = date instanceof Date ? date : (date as { toDate: () => Date }).toDate?.();
  if (!d) return '—';
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to load posts:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setDeleting(true);
    try {
      await deletePost(id);
      setPosts((p) => p.filter((post) => post.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#1B4332] text-white px-4 py-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/80">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-[#22C55E] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#16A34A] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-[#6B7280]">Total Posts</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">{posts.length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-[#6B7280]">Subscribers</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">—</p>
          </div>
        </div>

        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-[#22C55E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#16A34A] transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Post
        </Link>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-[#6B7280]">No posts yet. Create your first post!</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#1A1A1A] truncate">{post.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm text-[#6B7280]">
                      <span>{formatDate(post.createdAt)}</span>
                      {post.tag && (
                        <span className="text-[#22C55E]">{post.tag}</span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link
                      to={`/admin/posts/edit/${post.id}`}
                      className="px-4 py-2 border border-[#22C55E] text-[#22C55E] rounded-lg font-medium hover:bg-green-50 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
