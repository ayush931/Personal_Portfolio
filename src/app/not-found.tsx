import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-bg text-cyber-text p-4">
      <h1 className="text-4xl font-bold text-cyber-accent-light mb-4">404 - Page Not Found</h1>
      <p className="text-cyber-muted mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-full bg-cyber-text text-cyber-bg font-semibold hover:bg-cyber-accent-light transition-colors text-sm"
      >
        Return Home
      </Link>
    </div>
  );
}
