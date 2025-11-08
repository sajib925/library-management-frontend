import {  useNavigate } from "react-router-dom";
import type { Book } from "../types";
import { Button } from "../components/ui/button";

interface BookCardProps {
  book: Book & { image?: string; price?: number; description?: string };
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col gap-3 hover:shadow-2xl transition">
      {book.image && (
        <img
          src={book.image}
          alt={book.title}
          className="h-48 w-full object-cover rounded"
        />
      )}
      <h2 className="text-lg font-bold truncate">{book.title}</h2>
      <p className="text-sm text-gray-600 truncate">{book.author}</p>

      {/* Description */}
      {book.description && (
        <p className="text-gray-500 text-sm line-clamp-3">
          {book.description}
        </p>
      )}

      <p className="text-gray-500 text-sm">Genre: {book.genre}</p>
      <p className="text-gray-500 text-sm">Copies: {book.copies}</p>
      <p className="font-semibold">
        {book.available ? (
          <span className="text-green-600">Available</span>
        ) : (
          <span className="text-red-600">Unavailable</span>
        )}
      </p>
      <div className="mt-auto flex gap-2 pt-4">
        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer" onClick={() => onEdit(book)}>
          Edit
        </Button>
        <Button className="cursor-pointer" size="sm" variant="outline" onClick={() => navigate(`/books/${book._id}`)}>
          View
        </Button>
        <Button className="cursor-pointer" size="sm" variant="destructive" onClick={() => onDelete(book)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
