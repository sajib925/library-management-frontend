export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">BookLovers</h3>
          <p className="text-gray-400">
            Discover, borrow, and enjoy thousands of books online.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Links</h4>
          <ul className="text-gray-400 space-y-2">
            <li><a href="#hero" className="hover:text-white">Home</a></li>
            <li><a href="#books" className="hover:text-white">Books</a></li>
            <li><a href="#authors" className="hover:text-white">Authors</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Subscribe</h4>
          <p className="text-gray-400 mb-2">Get updates about new books and events.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 rounded-l-lg border border-gray-700 focus:outline-none"
            />
            <button className="px-4 py-2 bg-orange-500 rounded-r-lg font-semibold hover:bg-orange-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BookLovers. All rights reserved.
      </div>
    </footer>
  );
}
