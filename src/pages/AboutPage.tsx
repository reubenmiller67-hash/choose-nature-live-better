import AboutHero from '../components/about/AboutHero';
import ImageCarousel from '../components/home/ImageCarousel';
import WhySection from '../components/home/WhySection';
import HowItWorks from '../components/home/HowItWorks';
import MissionSection from '../components/about/MissionSection';
import WhyChooseUs from '../components/about/WhyChooseUs';
import CTASection from '../components/home/CTASection';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import BlogPreview from '../components/home/BlogPreview';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ImageCarousel />
      <WhySection />
      <HowItWorks />
      <MissionSection />
      <WhyChooseUs />
      <CTASection />
      <TestimonialCarousel />
      <BlogPreview />
    </>
  );
}
