'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-600 bg-[#1c1c23] text-white text-sm font-mono px-8 py-6">
      <div className="grid grid-cols-2 max-w-4xl mx-auto gap-12">
        <div className="justify-self-end -translate-x-4 sm:-translate-x-6 md:-translate-x-8 text-left">
          <p className="font-bold">Connect</p>
          <p className="text-gray-300">
            Building projects and <br />
            exploring new technologies.
          </p>
        </div>

        <div className="justify-self-start translate-x-4 sm:translate-x-6 md:translate-x-8 text-left">
          <p className="font-bold">Ongoing Projects</p>
          <p className="text-gray-300">/ Exploring the brain</p>
          <p className="text-gray-300">/ Advocacy via policy</p>
        </div>
      </div>

      <p className="text-center mt-5 text-gray-400">
        © Allison Pham {currentYear}. Made with ❤️ and 🍵
      </p>
    </footer>
  );
}