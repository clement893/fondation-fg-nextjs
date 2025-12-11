"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);
  const [waveY, setWaveY] = useState(50);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    let animationFrame: number;
    let startTime = Date.now();
    
    const animate = () => {
      const currentTime = (Date.now() - startTime) / 1000;
      setAnimationTime(currentTime);
      
      // Calculate wave position with multiple sine waves
      const baseWave = Math.sin(waveOffset * 0.003 + currentTime * 0.5) * 12;
      const secondWave = Math.sin(waveOffset * 0.005 - currentTime * 0.3) * 8;
      const thirdWave = Math.sin(waveOffset * 0.007 + currentTime * 0.7) * 5;
      
      const combinedWave = baseWave + secondWave + thirdWave;
      const centerY = 50;
      
      setWaveY(centerY + combinedWave);
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [mounted, waveOffset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Convert vertical scroll (mouse wheel) to horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    // Update scroll progress and wave offset
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      setWaveOffset(scrollLeft);
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
            background-position: -2000px 0;
          }
          100% {
            background-position: 2000px 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: brightness(1) saturate(1);
          }
          50% {
            filter: brightness(1.2) saturate(1.3);
          }
        }

        .wave-shimmer {
          background: linear-gradient(
            90deg,
            rgba(59, 130, 246, 0.9) 0%,
            rgba(99, 102, 241, 1) 15%,
            rgba(147, 51, 234, 1) 30%,
            rgba(219, 39, 119, 1) 50%,
            rgba(236, 72, 153, 0.9) 65%,
            rgba(147, 51, 234, 1) 80%,
            rgba(59, 130, 246, 0.9) 100%
          );
          background-size: 4000px 100%;
          animation: shimmer 6s linear infinite, pulse-glow 3s ease-in-out infinite;
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

      {/* Perfectly Smooth Wave Line - No CSS transitions */}
      {mounted && (
        <div 
          className="fixed left-0 h-3 z-40 pointer-events-none"
          style={{
            top: `${waveY}%`,
            width: `${scrollProgress}%`,
          }}
        >
          <div
            className="wave-shimmer h-full rounded-full"
            style={{
              boxShadow: `
                0 0 30px rgba(59, 130, 246, 0.7),
                0 0 60px rgba(147, 51, 234, 0.5),
                0 0 90px rgba(236, 72, 153, 0.3),
                0 0 120px rgba(99, 102, 241, 0.2)
              `,
            }}
          />
        </div>
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
