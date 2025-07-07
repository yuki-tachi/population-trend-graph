export default function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      <span className="ml-4 text-blue-500 text-lg">Loading...</span>
    </div>
  );
}
