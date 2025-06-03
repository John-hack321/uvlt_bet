import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Pear Betting</h1>
          <p className="text-lg text-gray-600 mb-8">
            A secure platform with a complete authentication system
          </p>
        </div>
        
        <div className="flex gap-6 items-center flex-col sm:flex-row">
          <Link
            href="/auth/login"
            className="rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 w-[200px]"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="rounded-md border border-solid border-blue-600 transition-colors flex items-center justify-center bg-white text-blue-600 gap-2 hover:bg-blue-50 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 w-[200px]"
          >
            Register
          </Link>
        </div>
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              Secure user authentication with JWT tokens
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              User registration with validation
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              Password reset functionality
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              Integration with Supabase (PostgreSQL)
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              Ready for deployment on Railway (backend) and Vercel (frontend)
            </li>
          </ul>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Pear Betting. All rights reserved.</p>
      </footer>
    </div>
  );
}
