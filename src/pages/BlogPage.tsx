import BlogList from '../components/blog/BlogList';

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm uppercase tracking-wider text-[#6B7280] mb-2">BLOG</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-12">
          Blog Posts
        </h1>
        <BlogList />
      </div>
    </section>
  );
}
