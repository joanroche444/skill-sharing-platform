import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroBanner = ({
  title = "Trade Hybe: Your Campus Marketplace",
  subtitle = "Discover, buy, and sell student services, products, and experiences all in one place.",
  backgroundImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
  primaryCta = {
    text: "Explore Marketplace",
    onClick: () => console.log("Explore clicked"),
  },
  secondaryCta = {
    text: "List Your Service",
    onClick: () => console.log("List service clicked"),
  },
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Students marketplace"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[400px] max-w-7xl flex-col items-start justify-center px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            <Users className="mr-2 h-4 w-4" />
            <span>By Students, For Students</span>
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-lg text-xl text-gray-300">{subtitle}</p>

          {/* Search Bar */}
          <div className="mb-8 flex w-full max-w-md items-center rounded-lg bg-white/10 p-1 backdrop-blur-sm">
            <div className="flex-1 px-3">
              <div className="flex items-center">
                <Search className="mr-2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for services..."
                  className="w-full bg-transparent py-2 text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
            <Button size="sm" className="rounded-md">
              Search
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2" onClick={primaryCta.onClick}>
              {primaryCta.text}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={cn(
                "border-white/20 bg-white/10 text-white hover:bg-white/20",
                "backdrop-blur-sm transition-colors"
              )}
              onClick={secondaryCta.onClick}
            >
              {secondaryCta.text}
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
    </div>
  );
};

export default HeroBanner;
