import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore 
import "swiper/css";
// @ts-ignore 
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const slides = [
    {
      id: 1,
      title: "Discover Your Next Favorite Book",
      subtitle: "Explore thousands of books across all genres.",
      img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1600",
    },
    {
      id: 2,
      title: "Read. Borrow. Enjoy.",
      subtitle: "Your digital library is now smarter and easier.",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600",
    },
    {
      id: 3,
      title: "Unlimited Knowledge Awaits",
      subtitle: "Dive into stories that inspire and empower.",
      img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Parent variant for stagger
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full h-[80vh] relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 z-10"></div>

              {/* Text */}
              <motion.div
                key={activeIndex === index ? slide.id : slide.id + "-inactive"}
                initial="hidden"
                animate="visible"
                variants={container}
                className="relative z-20 text-center text-white px-6 max-w-3xl"
              >
                {/* Letter by Letter Title (words preserved) */}
                <motion.h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl whitespace-pre-wrap">
                  {slide.title.split(" ").map((word, wIndex) => (
                    <span key={wIndex} className="inline-block mr-2">
                      {word.split("").map((char, i) => (
                        <motion.span key={i} variants={letterVariant} className="inline-block">
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-lg md:text-xl mb-6 opacity-90"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/all-books"
                  className="px-6 py-3 bg-white text-black rounded-xl font-semibold shadow hover:bg-gray-200 inline-block"
                >
                  Explore Books
                </motion.a>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
