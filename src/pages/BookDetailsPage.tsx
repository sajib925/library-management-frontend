import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBookQuery, useBorrowBookMutation } from "../api/libraryApi";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import toast from "react-hot-toast";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookQuery(id || "");
  const [borrowBook] = useBorrowBookMutation();
  const { register, handleSubmit, reset } = useForm();

  // Control dialog open/close manually
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) return <Loader />;
  if (!book) return <div className="p-4">Book not found</div>;

  const onSubmit = async (data: any) => {
    try {
      const quantity = Number(data.quantity);
      if (quantity > book.copies) {
        toast.error("Cannot borrow more than available copies!");
        return;
      }

      await borrowBook({
        book: book._id,
        quantity,
        borrowedDate: new Date().toISOString(),
        dueDate: data.dueDate,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      reset();
      setIsDialogOpen(false); // Close dialog on success
    } catch (err) {
      toast.error("Failed to borrow book");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        {/* Book Image */}
        <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-md">
          <img
            src={book.image || "https://via.placeholder.com/400x600?text=No+Image"}
            alt={book.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
          <p className="text-sm text-gray-500 mt-2">
            Genre: <span className="font-medium">{book.genre}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            ISBN: <span className="font-medium">{book.isbn}</span>
          </p>

          {/* Book Description */}
          <p className="mt-4 text-gray-700 leading-relaxed">{book.description}</p>

          {/* Availability & Copies */}
          <div className="mt-6 flex items-center gap-4">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                book.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {book.available ? "Available" : "Not Available"}
            </span>
            <span className="text-gray-600 text-sm">Copies: {book.copies}</span>
          </div>

          {/* Borrow Button & Dialog */}
          {book.available && (
            <div className="mt-8">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow cursor-pointer"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Borrow This Book
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Borrow “{book.title}”</DialogTitle>
                    <DialogDescription>
                      Select quantity and due date to borrow this book.
                    </DialogDescription>
                  </DialogHeader>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 flex flex-col gap-3"
                  >
                    <Input
                      type="number"
                      placeholder="Quantity"
                      min={1}
                      max={book.copies}
                      {...register("quantity", { required: true })}
                    />
                    <Input
                      type="date"
                      placeholder="Due Date"
                      {...register("dueDate", { required: true })}
                    />

                    <DialogFooter className="flex justify-end gap-2 mt-4">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" className="cursor-pointer">Confirm Borrow</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* Meta Info */}
      <div className="mt-12 border-t pt-6 text-sm text-gray-500">
        <p>Added on: {new Date(book.createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(book.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
