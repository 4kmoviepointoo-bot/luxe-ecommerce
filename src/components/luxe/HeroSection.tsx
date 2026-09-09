"use client";

import { ArrowRight, Sparkles, Star, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] lg:min-h-[85vh] flex items-center">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020908] via-[#04110E] to-[#071612]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_rgba(139,232,167,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,_rgba(23,60,45,0.15)_0%,_transparent_50%)]" />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E')] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[80vh]">

          {/* Left: Hero Content */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
              <Link href="/new-arrivals">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald hover:bg-emerald/10 hover:border-emerald/40 transition-all duration-300 cursor-pointer">
                  <Sparkles className="h-3.5 w-3.5" />
                  New Season 2026
                </span>
              </Link>
            </div>

            {/* Heading */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-[1.05] tracking-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <span className="text-[#F7F7F3] block">Redefine Your</span>
              <span className="text-emerald block">Style</span>
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg text-[#AEB8B3] max-w-md leading-relaxed mb-8 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Curated luxury pieces crafted for the modern connoisseur. Timeless design meets uncompromising quality.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-4 mb-10 animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2.5 rounded-full bg-emerald px-8 py-3.5 text-sm font-semibold text-[#020908] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,232,167,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/collections"
                className="group inline-flex items-center gap-2.5 rounded-full border border-emerald/30 px-8 py-3.5 text-sm font-medium text-[#F7F7F3]/70 transition-all duration-300 hover:bg-emerald/5 hover:border-emerald/50 hover:text-[#F7F7F3]"
              >
                Explore Categories
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Social Proof */}
            <div
              className="flex items-center gap-5 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-[#020908] bg-gradient-to-br from-emerald/40 to-deep-green flex items-center justify-center text-[10px] font-medium text-[#F7F7F3]"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-[#F7F7F3]">10K+</p>
                  <p className="text-[10px] text-[#AEB8B3]">Happy Customers</p>
                </div>
              </div>

              <div className="h-8 w-px bg-[#AEB8B3]/20" />

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#D8A94A] text-[#D8A94A]" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F7F7F3]">4.9</p>
                  <p className="text-[10px] text-[#AEB8B3]">Average Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hero Product Image */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-lg lg:max-w-none">
            <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
              {/* Ambient glow behind image */}
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(139,232,167,0.12)_0%,_transparent_70%)] blur-2xl" />

              {/* Product image */}
              <div className="relative z-10 w-full animate-float">
                <Image
                  src="/hero/hero-products.png"
                  alt="LUXE luxury watch and Émeralde perfume"
                  width={600}
                  height={500}
                  quality={80}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto rounded-2xl object-contain"
                  style={{
                    filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(139,232,167,0.1))",
                  }}
                />
              </div>

              {/* Floating particles - hidden on mobile for perf */}
              <div className="hidden md:block">
              {[
                { top: "20%", left: "10%", dur: "4.2s", delay: "0s" },
                { top: "60%", left: "85%", dur: "3.8s", delay: "0.5s" },
                { top: "30%", left: "90%", dur: "4.6s", delay: "1s" },
                { top: "70%", left: "5%", dur: "3.4s", delay: "1.5s" },
                { top: "15%", left: "75%", dur: "4.9s", delay: "2s" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-emerald/30 animate-float-particle"
                  style={{
                    top: p.top,
                    left: p.left,
                    "--dur": p.dur,
                    "--delay": p.delay,
                  } as React.CSSProperties}
                />
              ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <ChevronDown className="h-5 w-5 text-[#AEB8B3]/40" />
        </div>
      </div>
    </section>
  );
}
