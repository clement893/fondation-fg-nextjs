"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart, Users, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

interface TimelineSection {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: typeof Heart;
  stats?: {
    label: string;
    value: string;
  }[];
}

const timelineSections: TimelineSection[] = [
  {
    id: "founding",
    year: "2010",
    title: "Foundation Established",
    description:
      "Fondation FG was born from a vision to create lasting positive change in communities worldwide. Starting with a small team of dedicated volunteers, we set out to make education and healthcare accessible to underserved populations.",
    icon: Heart,
    stats: [
      { label: "Initial Donors", value: "50" },
      { label: "First Projects", value: "3" },
    ],
  },
  {
    id: "expansion",
    year: "2013",
    title: "Global Expansion",
    description:
      "Our impact grew exponentially as we expanded operations to 15 countries across three continents. Major partnerships with international organizations allowed us to scale our education and healthcare initiatives.",
    icon: Users,
    stats: [
      { label: "Countries Reached", value: "15" },
      { label: "Lives Impacted", value: "50,000+" },
      { label: "Total Donations", value: "$2.5M" },
    ],
  },
  {
    id: "innovation",
    year: "2017",
    title: "Innovation & Technology",
    description:
      "We launched our digital education platform, bringing quality learning resources to remote communities. Technology became a cornerstone of our approach, enabling us to reach more people with fewer resources.",
    icon: TrendingUp,
    stats: [
      { label: "Digital Students", value: "100,000+" },
      { label: "Online Courses", value: "250" },
      { label: "Tech Partners", value: "12" },
    ],
  },
  {
    id: "recognition",
    year: "2020",
    title: "Global Recognition",
    description:
      "Fondation FG received the International Humanitarian Award for our COVID-19 response efforts. Our emergency relief programs provided critical support to over 200,000 families during the pandemic.",
    icon: Award,
    stats: [
      { label: "Families Supported", value: "200,000+" },
      { label: "Emergency Aid", value: "$5M" },
      { label: "Volunteer Hours", value: "500,000+" },
    ],
  },
  {
    id: "present",
    year: "2024",
    title: "Continuing Our Mission",
    description:
      "Today, Fondation FG operates in 35 countries with a network of 10,000+ volunteers. Our comprehensive programs in education, healthcare, environmental sustainability, and economic empowerment continue to transform lives.",
    icon: Heart,
    stats: [
      { label: "Active Countries", value: "35" },
      { label: "Total Impact", value: "1M+ Lives" },
      { label: "Annual Budget", value: "$15M" },
    ],
  },
];

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

        <div className="h-full flex">
          {/* Hero Section */}
          <section className="min-w-full h-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 px-6">
            <div className="max-w-4xl text-center space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                Our Journey Through Time
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                Scroll to explore our story of impact, innovation, and
                compassion spanning over a decade.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    if (containerRef.current) {
                      containerRef.current.scrollTo({
                        left: window.innerWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Begin Journey
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ArrowRight className="h-4 w-4 animate-pulse" />
                <span>Use your mouse wheel to scroll horizontally</span>
              </div>
            </div>
          </section>

          {/* Timeline Sections */}
          {timelineSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <section
                key={section.id}
                className="min-w-full h-full flex-shrink-0 flex items-center px-6 lg:px-20"
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(to right, #ffffff, #f9fafb)"
                      : "linear-gradient(to left, #f3f4f6, #ffffff)",
                }}
              >
                <div className="max-w-5xl mx-auto w-full">
                  <div className="flex items-start gap-8 mb-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                        <Icon className="h-10 w-10 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-blue-600 mb-3">
                        {section.year}
                      </div>
                      <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                        {section.title}
                      </h2>
                      <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {section.stats && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 max-w-3xl">
                      {section.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm"
                        >
                          <div className="text-4xl font-bold text-blue-600 mb-3">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {/* Final CTA Section */}
          <section className="min-w-full h-full flex-shrink-0 flex items-center justify-center bg-gradient-to-l from-blue-50 via-white to-gray-50 px-6">
            <div className="max-w-3xl text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Join Us in Making a Difference
              </h2>
              <p className="text-xl text-gray-600">
                Your support helps us continue our mission of creating positive
                change in communities worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Get Involved
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/events"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition-colors inline-flex items-center justify-center"
                >
                  View Our Events
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-gray-200 z-40">
        <div
          className="h-full bg-blue-600 transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* Scroll Hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur border border-gray-200 rounded-full px-6 py-3 shadow-lg z-50 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4" />
          <span>Scroll with your mouse wheel</span>
        </div>
      </div>
    </div>
  );
}
