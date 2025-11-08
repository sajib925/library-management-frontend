import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookDetailsPage from "./pages/BookDetailsPage";
import AllBooksPage from "./pages/AllBooksPage";
import BorrowSummaryPage from "./pages/BorrowSummery";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Navbar />
      <main className="flex-1 pb-6">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <BooksPage /> },
      { path: "all-books", element: <AllBooksPage /> },
      { path: "books/:id", element: <BookDetailsPage /> },
      { path: "borrow-summary", element: <BorrowSummaryPage /> },
      { path: "*", element: <div className="p-4">Page not found</div> },

    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
