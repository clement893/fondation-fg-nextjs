"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Convert vertical scroll (mouse wheel) to horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    // Update scroll progress
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-white">
      {/* Wave Animation Keyframes */}
      <style jsx global>{`
        @keyframes wave {
          0% {
            transform: translateY(0) scaleY(1);
          }
          25% {
            transform: translateY(-3px) scaleY(1.5);
          }
          50% {
            transform: translateY(0) scaleY(1);
          }
          75% {
            transform: translateY(3px) scaleY(1.5);
          }
          100% {
            transform: translateY(0) scaleY(1);
          }
        }

        .wave-line {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-white/95 backdrop-blur z-50 flex items-center justify-between px-6">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer text-gray-900">
            Fondation FG
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm font-medium cursor-pointer hover:text-blue-600 transition-colors text-gray-700"
          >
            About
          </Link>
          <Link
            href="/articles"
            className="text-sm font-medium cursor-pointer hover:text-blue-600 transition-colors text-gray-700"
          >
            Articles
          </Link>
          <Link
            href="/events"
            className="text-sm font-medium cursor-pointer hover:text-blue-600 transition-colors text-gray-700"
          >
            Events
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium cursor-pointer hover:text-blue-600 transition-colors text-gray-700"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="h-full pt-16 overflow-x-auto overflow-y-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Horizontal content - 5 sections - All white background */}
        <div className="h-full flex">
          {/* Section 1 - Hero */}
          <section className="min-w-full h-full flex-shrink-0 flex items-center justify-center bg-white px-6">
            <div className="max-w-4xl text-center space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                Fondation FG
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                Scroll to explore our journey
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="min-w-full h-full flex-shrink-0 flex items-center justify-center bg-white px-6">
            <div className="max-w-4xl text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
                2010
              </h2>
            </div>
          </section>

          {/* Section 3 */}
          <section className="min-w-full h-full flex-shrink-0 flex items-center justify-center bg-white px-6">
            <div className="max-w-4xl text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
                2015
              </h2>
            </div>
          </section>

          {/* Section 4 */}
          <section className="min-w-full h-full flex-shrink-0 flex items-center justify-center bg-white px-6">
            <div className="max-w-4xl text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
                2020
              </h2>
            </div>
          </section>

          {/* Section 5 */}
          <section className="min-w-full h-full flex-shrink-0 flex items-center justify-center bg-white px-6">
            <div className="max-w-4xl text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
                2024
              </h2>
            </div>
          </section>
        </div>
      </div>

      {/* Animated Wave Line */}
      <div className="fixed top-1/2 left-0 right-0 h-1 bg-gray-100 z-40 pointer-events-none overflow-hidden">
        <div
          className="wave-line h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out origin-left"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: `0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)`,
          }}
        />
      </div>

      {/* Scroll Hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur border border-gray-200 rounded-full px-6 py-3 shadow-lg z-50 text-sm text-gray-600 animate-pulse">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <span>Scroll with your mouse wheel</span>
        </div>
      </div>
    </div>
  );
}
