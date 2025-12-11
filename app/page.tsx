"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wavePhase, setWavePhase] = useState(0);
  const [mounted, setMounted] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Convert vertical scroll (mouse wheel) to horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    // Update scroll progress and wave phase
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      
      // Calculate wave phase based on scroll delta (only when scrolling)
      const scrollDelta = scrollLeft - lastScrollRef.current;
      if (Math.abs(scrollDelta) > 0) {
        setWavePhase(prev => prev + scrollDelta * 0.01);
      }
      lastScrollRef.current = scrollLeft;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Generate SVG path for ondulating line
  const generateWavePath = () => {
    if (!mounted || typeof window === 'undefined') return '';
    
    const width = (window.innerWidth * scrollProgress) / 100;
    if (width === 0) return '';
    
    const amplitude = 30; // Height of waves
    const frequency = 0.01; // How many waves per pixel
    const points: string[] = [];
    
    // Generate smooth sine wave path
    for (let x = 0; x <= width; x += 2) {
      const y = Math.sin(x * frequency + wavePhase) * amplitude;
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="h-screen overflow-hidden bg-white">
      {/* CSS Styles */}
      <style jsx global>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .scroll-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        @keyframes shimmer {
          0% {
            stroke-dashoffset: 2000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .wave-path {
          stroke: url(#waveGradient);
          stroke-width: 4;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))
                  drop-shadow(0 0 20px rgba(147, 51, 234, 0.4))
                  drop-shadow(0 0 30px rgba(236, 72, 153, 0.3));
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
        className="scroll-container h-full pt-16 overflow-x-auto overflow-y-hidden"
      >
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

      {/* Ondulating SVG Wave Line */}
      {mounted && scrollProgress > 0 && (
        <svg
          className="fixed top-1/2 left-0 pointer-events-none z-40"
          style={{
            width: '100%',
            height: '200px',
            transform: 'translateY(-50%)',
          }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.9" />
              <stop offset="25%" stopColor="rgb(99, 102, 241)" stopOpacity="1" />
              <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="1" />
              <stop offset="75%" stopColor="rgb(236, 72, 153)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <g transform="translate(0, 100)">
            <path
              className="wave-path"
              d={generateWavePath()}
            />
          </g>
        </svg>
      )}

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
