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
      
      // Calculate wave phase based on scroll delta
      const scrollDelta = scrollLeft - lastScrollRef.current;
      if (Math.abs(scrollDelta) > 0) {
        setWavePhase(prev => prev + scrollDelta * 0.015);
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

  // Generate ultra-smooth SVG path with multiple sine waves
  const generateWavePath = (offset = 0, amplitudeMultiplier = 1) => {
    if (!mounted || typeof window === 'undefined') return '';
    
    const width = (window.innerWidth * scrollProgress) / 100;
    if (width === 0) return '';
    
    const baseAmplitude = 25 * amplitudeMultiplier;
    const points: string[] = [];
    
    // Much higher density for ultra-smooth curves
    for (let x = 0; x <= width; x += 0.5) {
      // Combine multiple sine waves for organic, flowing movement
      const wave1 = Math.sin(x * 0.008 + wavePhase + offset) * baseAmplitude;
      const wave2 = Math.sin(x * 0.012 - wavePhase * 0.7 + offset) * (baseAmplitude * 0.5);
      const wave3 = Math.sin(x * 0.015 + wavePhase * 1.3 + offset) * (baseAmplitude * 0.3);
      
      const y = wave1 + wave2 + wave3;
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

        @keyframes holographic-shift {
          0%, 100% {
            stop-color: rgb(59, 130, 246);
          }
          33% {
            stop-color: rgb(147, 51, 234);
          }
          66% {
            stop-color: rgb(236, 72, 153);
          }
        }

        .wave-layer-1 {
          stroke: url(#waveGradient1);
          stroke-width: 5;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8))
                  drop-shadow(0 0 30px rgba(147, 51, 234, 0.5));
          opacity: 0.9;
        }

        .wave-layer-2 {
          stroke: url(#waveGradient2);
          stroke-width: 4;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 12px rgba(147, 51, 234, 0.7))
                  drop-shadow(0 0 25px rgba(236, 72, 153, 0.4));
          opacity: 0.7;
        }

        .wave-layer-3 {
          stroke: url(#waveGradient3);
          stroke-width: 3;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))
                  drop-shadow(0 0 20px rgba(99, 102, 241, 0.3));
          opacity: 0.5;
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
        {/* Horizontal content - 5 sections */}
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

      {/* Ultra-Smooth Holographic Wave - Multiple Layers */}
      {mounted && scrollProgress > 0 && (
        <svg
          className="fixed top-1/2 left-0 pointer-events-none z-40"
          style={{
            width: '100%',
            height: '300px',
            transform: 'translateY(-50%)',
          }}
        >
          <defs>
            {/* Gradient for layer 1 */}
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="1" />
              <stop offset="33%" stopColor="rgb(99, 102, 241)" stopOpacity="1" />
              <stop offset="66%" stopColor="rgb(147, 51, 234)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="1" />
            </linearGradient>
            
            {/* Gradient for layer 2 */}
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="1" />
              <stop offset="50%" stopColor="rgb(219, 39, 119)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="1" />
            </linearGradient>
            
            {/* Gradient for layer 3 */}
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(236, 72, 153)" stopOpacity="1" />
              <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="1" />
            </linearGradient>
          </defs>
          
          <g transform="translate(0, 150)">
            {/* Layer 1 - Main wave */}
            <path
              className="wave-layer-1"
              d={generateWavePath(0, 1)}
            />
            
            {/* Layer 2 - Secondary wave */}
            <path
              className="wave-layer-2"
              d={generateWavePath(Math.PI / 3, 0.8)}
            />
            
            {/* Layer 3 - Tertiary wave */}
            <path
              className="wave-layer-3"
              d={generateWavePath(Math.PI / 1.5, 0.6)}
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
