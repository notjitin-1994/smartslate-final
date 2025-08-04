'use client';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 py-8 select-none">
      <button
        className="px-6 py-2 bg-gray-700 text-gray-50 border border-gray-600 rounded-md 
                   hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 
                   disabled:cursor-not-allowed flex items-center gap-2"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        <span>«</span>
        <span>Prev</span>
      </button>

      <span className="text-gray-300 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="px-6 py-2 bg-gray-700 text-gray-50 border border-gray-600 rounded-md 
                   hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 
                   disabled:cursor-not-allowed flex items-center gap-2"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        <span>Next</span>
        <span>»</span>
      </button>
    </div>
  );
}