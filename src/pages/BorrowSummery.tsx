import { useGetBorrowSummaryQuery } from "../api/libraryApi";
import BorrowSummaryHero from "../sections/BorrowSummaryHero";

export default function BorrowSummaryPage() {
  const { data: borrows, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading)
    return <p className="text-center mt-10">Loading Borrowed Books...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load borrow summary.
      </p>
    );

  return (
    <>
      <BorrowSummaryHero />
      <div className="container mx-auto px-4 py-10" id="summary">
        <h1 className="text-3xl font-bold mb-6">Borrow Summary</h1>

        {borrows?.length === 0 && (
          <p className="text-center text-gray-500">
            No borrow records found.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrows?.map((item: any) => (
            <div
              key={item._id}
              className="p-5 bg-white shadow rounded-lg border hover:shadow-lg transition"
            >
              {/* Book Title */}
              <h2 className="text-xl font-bold mb-1">
                {item.book?.title || "Unknown Book"}
              </h2>

              {/* Author */}
              <p className="text-gray-600">
                <span className="font-semibold">Author:</span>{" "}
                {item.book?.author || "Unknown"}
              </p>

              {/* Borrow date */}
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Borrowed Date:</span>{" "}
                {new Date(item.borrow_date).toLocaleDateString()}
              </p>

              {/* Return date */}
              <p className="text-gray-600">
                <span className="font-semibold">Return Date:</span>{" "}
                {new Date(item.return_date).toLocaleDateString()}
              </p>

              {/* Returned Status */}
              <p className="mt-2">
                {item.returned ? (
                  <span className="text-green-600 font-semibold">
                    ✅ Returned
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    ❌ Not Returned
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
