export default function NotFound() {
  return (
    <main className="flex flex-col items-start justify-center px-12 sm:px-36 md:px-52 lg:px-72 xl:px-80 py-20 max-w-6xl mx-auto flex-grow">
      <div className="max-w-3xl">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6 text-gray-400">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    </main>
  );
}