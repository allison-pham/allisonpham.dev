'use client';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/experiences', label: 'experiences' },
  { href: '/projects', label: 'projects' },
  // { href: '/blog', label: 'blog' },
  // { href: '/contact', label: 'contact' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-lg font-mono text-white gap-4 sm:gap-0 bg-[#25242C] backdrop-blur-sm border-b border-gray-800/50">
      <div className="text-lg font-light">Allison Pham</div>
      <nav className="flex flex-wrap gap-4 sm:gap-6">
        {navItems.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-0.5 group transition-colors duration-200"
          >
            <span style={{ color: '#B6A8F9' }}>#</span>
            <span className="group-hover:text-purple-400">{label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}