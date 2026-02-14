import HeroSection from '../components/home/HeroSection';
import AboutPreview from '../components/home/AboutPreview';
import ImageCarousel from '../components/home/ImageCarousel';
import WhySection from '../components/home/WhySection';
import HowItWorks from '../components/home/HowItWorks';
import NewsletterSignup from '../components/home/NewsletterSignup';
import CTASection from '../components/home/CTASection';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import BlogPreview from '../components/home/BlogPreview';
import PhoneSignup from '../components/home/PhoneSignup';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ImageCarousel />
      <WhySection />
      <HowItWorks />
      <NewsletterSignup />
      <CTASection />
      <TestimonialCarousel />
      <BlogPreview />
      <PhoneSignup />
    </>
  );
}
