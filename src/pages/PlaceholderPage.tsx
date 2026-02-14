interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
          {title}
        </h1>
        <p className="text-lg text-[#6B7280]">
          This page is coming soon. Please check back later.
        </p>
      </div>
    </section>
  );
}
