import { useState } from "react";
import { useCreateBookMutation, useDeleteBookMutation, useGetBooksQuery, useUpdateBookMutation } from "../api/libraryApi";
import type { Book } from "../types";
import BookCard from "../components/BookCard";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "../components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";
import AllBooksHero from "../sections/AllBooksHero";
import { Toaster, toast } from "react-hot-toast";

export default function AllBooksPage() {
  const { data: books, isLoading, error } = useGetBooksQuery();
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm();

  if (isLoading)
    return <p className="text-center mt-10 text-lg">Loading books...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error fetching books</p>;

  const filtered = books
    ?.filter(
      (b: Book) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
    )
    .filter((b: Book) => (genre === "all" ? true : b.genre === genre))
    .filter((b: Book) => {
      if (availability === "available") return b.available === true;
      if (availability === "unavailable") return b.available === false;
      return true;
    });

  const pageSize = 6;
  const totalPages = Math.ceil((filtered?.length || 0) / pageSize);
  const paginatedBooks = filtered?.slice((page - 1) * pageSize, page * pageSize);

  const nextPage = () => page < totalPages && setPage((p) => p + 1);
  const prevPage = () => page > 1 && setPage((p) => p - 1);

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

  const onSubmit = async (data: any) => {
    try {
      if (!data.isbn) {
        data.isbn = `ISBN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      }

      if (selectedBook) {
        await updateBook({ id: selectedBook._id, data }).unwrap();
        toast.success("Book updated successfully!");
      } else {
        await createBook(data).unwrap();
        toast.success("Book created successfully!");
      }

      setIsDialogOpen(false);
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save book.");
    }
  };


  const handleDelete = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBook) return;
    try {
      await deleteBook(selectedBook._id).unwrap();
      toast.success(`Deleted "${selectedBook.title}"`);
    } catch (err) {
      toast.error("Failed to delete book.");
    } finally {
      setIsDeleteOpen(false);
      setSelectedBook(null);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AllBooksHero />
      <div className="container mx-auto px-4 py-10" id="books">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Books</h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  reset();
                  setSelectedBook(null);
                }}
                className="cursor-pointer"
              >
                Create Book
              </Button>
            </DialogTrigger>

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
                  <Button type="submit" className="cursor-pointer">
                    {selectedBook ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search by title/author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Select
            value={genre}
            onValueChange={(value) => {
              setGenre(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="FICTION">FICTION</SelectItem>
              <SelectItem value="NON_FICTION">NON FICTION</SelectItem>
              <SelectItem value="SCIENCE">SCIENCE</SelectItem>
              <SelectItem value="HISTORY">HISTORY</SelectItem>
              <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
              <SelectItem value="FANTASY">FANTASY</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={availability}
            onValueChange={(value) => {
              setAvailability(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Books Grid */}
        {paginatedBooks?.length === 0 ? (
          <p>No books found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBooks?.map((book: Book) => (
              <BookCard
                key={book._id}
                book={book}
                onEdit={openBookDialog}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 cursor-pointer">
            <Button variant="outline" disabled={page === 1} onClick={prevPage}>
              Previous
            </Button>
            <span className="font-medium">
              Page {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={nextPage}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
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
              <Button variant="destructive" onClick={confirmDelete} className="cursor-pointer">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
