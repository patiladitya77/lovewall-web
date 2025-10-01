"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#6c47ff] via-[#5a39d4] to-[#2b1a66] text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 sm:px-8 h-16">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          TestimonialsApp
        </h2>
        <div className="flex gap-4 items-center">
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 rounded-full text-sm sm:text-base font-medium border border-white text-white hover:bg-white hover:text-[#6c47ff] transition cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-white text-[#6c47ff] rounded-full font-medium text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 hover:opacity-90 transition cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 py-12 sm:py-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Collect & Share{" "}
          <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
            Video Testimonials
          </span>
        </h1>
        <p className="text-gray-200 text-base sm:text-lg max-w-2xl mb-8">
          Build trust with authentic stories. Upload, manage, and showcase
          testimonials with ease using our modern platform.
        </p>

        <SignedOut>
          <SignUpButton>
            <button className="bg-white text-[#6c47ff] rounded-full font-semibold text-lg sm:text-xl px-6 sm:px-8 py-3 hover:opacity-90 shadow-md transition cursor-pointer">
              Get Started
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </main>
    </div>
  );
}
