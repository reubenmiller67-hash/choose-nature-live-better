import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-sm uppercase tracking-wider text-[#6B7280] mb-2">CONTACT</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-12">
          Get in Touch
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center bg-[#22C55E] text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-[#16A34A] transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
