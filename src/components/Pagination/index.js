export default function Pagination({
  page,
  handleNext,
  handlePrevious,
  pageCount,
}) {
  return (
    <nav
      className='bg-transparent px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6'
      aria-label='Pagination'
    >
      <div className='hidden sm:block'>
        <p className='text-sm text-white'>
          Showing <span className='font-medium'>{page}</span> of{' '}
          <span className='font-medium'>{pageCount}</span> pages
        </p>
      </div>
      <div className='flex-1 flex justify-between sm:justify-end'>
        {page - 1 > 0 && (
          <button
            type='button'
            onClick={handlePrevious}
            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          >
            Previous
          </button>
        )}
        {page + 1 <= pageCount && (
          <button
            disabled={page + 1 > pageCount}
            type='button'
            onClick={handleNext}
            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          >
            Next
          </button>
        )}
      </div>
    </nav>
  );
}
