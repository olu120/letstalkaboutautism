import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6 text-center">
      <div className="max-w-sm">
        <img
          src="/logo.png"
          alt="Let’s Talk About Autism logo"
          className="mx-auto w-24 h-24 mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-gray-600 mb-6">
          We couldn’t find the page you were looking for.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-blue-600 text-white px-5 py-3 font-medium hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
      <footer className="mt-10 text-xs text-gray-500">
        © {new Date().getFullYear()} Let’s Talk About Autism
      </footer>
    </main>
  );
}
