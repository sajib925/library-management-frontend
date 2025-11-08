export default function Authors() {
  const authors = [
    { id: 1, name: "J.K. Rowling", img: "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg" },
    { id: 2, name: "George R.R. Martin", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg" },
    { id: 3, name: "Agatha Christie", img: "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg" },
    { id: 4, name: "Stephen King", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Authors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((a) => (
            <div key={a.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition text-center p-4">
              <img src={a.img} alt={a.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
              <h3 className="text-xl font-semibold">{a.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
