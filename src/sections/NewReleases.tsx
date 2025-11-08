import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useGetBooksQuery } from "../api/libraryApi";

export default function NewReleases() {
  // Fetch books from RTK Query
  const { data: books, isLoading, error } = useGetBooksQuery();

  if (isLoading) return <p className="text-center py-10">Loading new releases...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load books</p>;
  if (!books || books.length === 0) return <p className="text-center py-10">No new releases</p>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">New Releases</h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {books.map((book) => (
            <SwiperSlide key={book._id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
                <img
                  src={book.image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={book.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{book.author}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
