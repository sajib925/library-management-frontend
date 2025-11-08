import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../api/libraryApi";
import type { Book } from "../types";
import BookCard from "../components/BookCard"; 
import { Input } from "../components/ui/input";
import { SelectItem } from "@radix-ui/react-select";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../components/ui/select";
import { Link } from "react-router-dom";

const BooksSection = () => {
  const { data: books, isLoading, error } = useGetBooksQuery();
  const firstThreeBooks = books?.slice(0, 3) || [];
  const [deleteBook] = useDeleteBookMutation();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm();

  if (isLoading)
    return <p className="text-center text-gray-500">Loading books...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load books.</p>;

    const openBookDialog = (book?: Book) => {
    setSelectedBook(book || null);
    setIsDialogOpen(true);

    if (book) {
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("genre", book.genre);
      setValue("copies", book.copies);
      setValue("available", book.available);
      setValue("image", book.image || "");
      setValue("description", book.description || "");
    } else {
      reset();
    }
  };
  const onSubmit = (data: any) => {
    console.log("Create / Update Book", data);
    toast.success(selectedBook ? "Book updated!" : "Book created!");
    setIsDialogOpen(false);
    reset();
  };

  const confirmDelete = async () => {
    if (!selectedBook) return;
    try {
      await deleteBook(selectedBook._id).unwrap();
      toast.success("Book deleted successfully!");
    } catch {
      toast.error("Failed to delete book.");
    } finally {
      setIsDeleteOpen(false);
      setSelectedBook(null);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <Toaster position="top-right" reverseOrder={false} />
      

      <div className="flex justify-center items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Books Collection</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            
            <DialogContent className="sm:max-w-md">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>
                    {selectedBook ? "Edit Book" : "Create Book"}
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-3">
                  <div>
                    <Input
                      {...register("title", { required: "Title is required" })}
                      placeholder="Title"
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-red-600 text-sm mt-1">{"Title is required"}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("author", { required: "Author is required" })}
                      placeholder="Author"
                      className={errors.author ? "border-red-500" : ""}
                    />
                    {errors.author && (
                      <p className="text-red-600 text-sm mt-1">{"Author is required"}</p>
                    )}
                  </div>

                  <Input {...register("image")} placeholder="Image URL" />

                  <Input {...register("description")} placeholder="Description" />

                  <div>
                    <Select
                      onValueChange={(value) => setValue("genre", value, { shouldValidate: true })}
                    >
                      <SelectTrigger
                        className={errors.genre ? "border-red-500 w-full" : "w-full"}
                      >
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="FICTION">FICTION</SelectItem>
                        <SelectItem value="NON_FICTION">NON FICTION</SelectItem>
                        <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                        <SelectItem value="HISTORY">HISTORY</SelectItem>
                        <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                        <SelectItem value="FANTASY">FANTASY</SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.genre && (
                      <p className="text-red-600 text-sm mt-1">Genre is required</p>
                    )}
                  </div>

                  {/* Copies */}
                  <div>
                    <Input
                      type="number"
                      {...register("copies", { required: "Copies is required" })}
                      placeholder="Copies"
                      className={errors.copies ? "border-red-500" : ""}
                    />
                    {errors.copies && (
                      <p className="text-red-600 text-sm mt-1">{"Copies is required"}</p>
                    )}
                  </div>

                  {/* Available */}
                  <label className="flex items-center gap-2">
                    <Input type="checkbox" {...register("available")} className="w-4" />
                    Available
                  </label>
                </div>



                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">
                    {selectedBook ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
        </Dialog>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {firstThreeBooks?.map((book: Book) => (
          <BookCard
            key={book._id}
            book={book}
            onEdit={openBookDialog}
            onDelete={(book) => {
              setSelectedBook(book);
              setIsDeleteOpen(true);
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mt-8">
        <Link to="/all-books">
          <Button className="bg-blue-600 text-white font-medium px-10 py-3 shadow-md  hover:bg-blue-700 focus:outline-none focus:ring-2  focus:ring-blue-400 focus:ring-offset-2 transition-colors duration-200 cursor-pointer">
          See All Books
        </Button>
        </Link>
      </div>

      {/* Delete Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedBook?.title}</span>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="cursor-pointer"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BooksSection;
