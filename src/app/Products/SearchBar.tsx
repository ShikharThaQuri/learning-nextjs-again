export function SearchBar() {
  return (
    <div className="flex items-center justify-center my-10">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
