import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function Testimonials() {
  const testimonials = [
    { id: 1, name: "Alice Johnson", text: "Amazing collection and fast delivery!", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 2, name: "Michael Smith", text: "I love the new releases section!", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Sarah Lee", text: "Easy to borrow and return books online.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Readers Say</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          modules={[Autoplay]}
          autoplay={{ delay: 4000 }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-xl mx-auto">
                <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                <p className="text-gray-700 italic mb-4">"{t.text}"</p>
                <h4 className="font-semibold">{t.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
