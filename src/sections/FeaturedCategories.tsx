export default function FeaturedCategories() {
  const categories = [
    { id: 1, name: "Fiction", desc: "Dive into imaginary worlds.", img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=400" },
    { id: 2, name: "Non-Fiction", desc: "Learn from real stories.", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400" },
    { id: 3, name: "Science", desc: "Discover scientific wonders.", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400" },
    { id: 4, name: "History", desc: "Travel back in time.", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400" },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
              <img src={cat.img} alt={cat.name} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{cat.name}</h3>
                <p className="text-gray-600 mt-2">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
