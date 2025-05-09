import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar, Home, Laptop } from "lucide-react";

const CategoryGrid = ({
  categories = [
    {
      id: "side-hustles",
      title: "Side Hustles",
      description:
        "Support student entrepreneurs! Discover unique products and services made by your peers.",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-700",
      href: "/categories/side-hustles",
      image:
        "https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=800&q=80",
    },
    {
      id: "experiences",
      title: "Experiences",
      description:
        "Bringing Students Together Through Events! Join to participate and discover exciting campus events.",
      icon: <Calendar className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-700",
      href: "/categories/experiences",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    },
    {
      id: "rentals",
      title: "Rentals",
      description:
        "Why buy when you can rent? Find affordable spaces, gadgets, and gear from fellow students.",
      icon: <Home className="h-8 w-8" />,
      color: "bg-amber-100 text-amber-700",
      href: "/categories/rentals",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    },
    {
      id: "digital-services",
      title: "Digital Services",
      description:
        "Unlock student talent! Get top-notch freelance work for your projects.",
      icon: <Laptop className="h-8 w-8" />,
      color: "bg-emerald-100 text-emerald-700",
      href: "/categories/digital-services",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    },
  ],
  className,
}) => {
  return (
    <div className={cn("w-full max-w-7xl mx-auto px-4 py-12 bg-white", className)}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Explore Categories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer h-full"
            onClick={() => (window.location.href = category.href)}
          >
            <div className="h-40 w-full overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
              />
            </div>
            <CardContent className="p-6 flex flex-col h-full">
              <div className={cn("p-3 rounded-full w-fit mb-4", category.color)}>
                {category.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm flex-grow">{category.description}</p>

              <div className="mt-4 text-sm font-medium text-primary flex items-center">
                Explore {category.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
