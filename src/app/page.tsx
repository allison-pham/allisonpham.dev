export default function HomePage() {
  return (
    <main className="flex flex-col items-start justify-start px-45 pt-35 pb-20">
      <h1 className="text-5xl font-bold mb-4">Allison Pham</h1>
      <p className="text-gray-300 mb-6 max-w-md">
        Developing and designing to build innovative solutions.
      </p>
      <button className="border px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition">
        Explore
      </button>
    </main>
  );
}