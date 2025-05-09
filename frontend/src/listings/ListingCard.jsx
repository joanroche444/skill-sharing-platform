import React from "react";
import { Star, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ListingCard = ({
  id = "1",
  title = "Professional Logo Design",
  price = 25,
  image = "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80",
  category = "Digital Services",
  rating = 4.8,
  sellerName = "Alex Johnson",
  sellerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  isFeatured = false,
  onClick = () => {},
}) => {
  return (
    <Card
      className={cn(
        "w-full max-w-[280px] overflow-hidden transition-all duration-200 hover:shadow-lg bg-white",
        isFeatured && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={onClick}
    >
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
        />
        {isFeatured && (
          <Badge
            variant="secondary"
            className="absolute right-2 top-2 bg-primary text-primary-foreground"
          >
            Featured
          </Badge>
        )}
        <button
          className="absolute right-2 bottom-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            // Favorite functionality would go here
          }}
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-gray-100 text-xs">
            {category}
          </Badge>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>
        <h3 className="mt-2 line-clamp-2 text-sm font-semibold">{title}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-2">
          <img
            src={sellerAvatar}
            alt={sellerName}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-xs text-gray-600">{sellerName}</span>
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center justify-between">
          <div className="font-medium">
            <span className="text-sm">Rs.</span>
            <span className="text-lg">{price * 100}</span>
          </div>
          <button
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            onClick={(e) => {
              e.stopPropagation();
              // View details functionality would go here
            }}
          >
            View Details
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
