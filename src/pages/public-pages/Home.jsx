import Hero from "../../components/home/Hero";
import HowItWorksSection from "../../components/home/HowItWorksSection";
import PricingPlansSection from "../../components/home/PricingPlansSection";
import ReviewSection from "../../components/home/ReviewSection";
import SalesPromotion from "../../components/home/SalesPromotion";
import ServiceSection from "../../components/home/ServiceSection";

const Home = () => {
  const slides = [
    {
      image: "https://i.ibb.co.com/2NKp7LR/pexels-photo-8353820.jpg",
      title: "Empower Your Workforce, Elevate Your Success",
      description:
        "Discover how HRMpro streamlines team management, boosts productivity, and drives business growth.",
    },
    {
      image: "https://i.ibb.co.com/9gyzYtW/pexels-photo-8190807.jpg",
      title: "HR Excellence, Redefined",
      description:
        "Join hundreds of businesses achieving unparalleled efficiency with our powerful tools and insights.",
    },
    {
      image: "https://i.ibb.co.com/k4bttKX/pexels-photo-5716037.jpg",
      title: "Unleash the Power of a Connected Team",
      description:
        "See how HRMpro helps businesses thrive with smarter management and real-time performance tracking.",
    },
  ];

  return (
    <div>
      <Hero slides={slides} />
      <ServiceSection />
      <HowItWorksSection />
      <SalesPromotion />
      <PricingPlansSection />
      <ReviewSection />
    </div>
  );
};

export default Home;
