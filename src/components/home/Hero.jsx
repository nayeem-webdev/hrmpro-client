import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Hero = ({ slides }) => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[calc(100vh-64px)] max-h-[900px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        effect={"fade"}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop
        className="w-full h-full"
        
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-[calc(100vh-64px)] max-h-[900px]"
              />
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 md:px-8 z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-lg mb-6">{slide.description}</p>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-primary px-6 py-3 text-sm md:text-lg rounded-lg hover:bg-primary/80 transition"
                >
                  Sign Up Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

Hero.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Hero;
