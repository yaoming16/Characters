interface loadingError {
  loading: boolean;
  error: Error | null;
}

function Loading({ loading, error }: loadingError) {
  if (loading) {
    return (
      <div
        className="flex items-center justify-center p-8"
        style={{ height: "70vh" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading character data for PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center p-8"
        style={{ height: "70vh" }}
      >
        <div className="text-center text-red-600">
          <p className="font-bold mb-2">
            Error loading character data. Definitions, Pinyin and stroke orders
            will be disabled. Type a character to generate a practice sheet or
            reload the page to try again to get character data.
          </p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }
  return null;
}

export default Loading;
