import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-zinc-200">404</h1>
      <h2 className="text-2xl font-bold text-zinc-900 mt-4">Page Not Found</h2>
      <p className="text-zinc-600 mt-2 max-w-md">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4 mt-8">
        <Link
          href="/"
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded text-sm font-semibold transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/experience"
          className="border border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-6 py-2.5 rounded text-sm font-semibold transition-colors"
        >
          Browse Experiences
        </Link>
      </div>
    </div>
  );
}
