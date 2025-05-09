import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Menu,
  Search,
  ShoppingCart,
  User,
  MessageSquare,
  Heart,
  Package,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const Navbar = ({
  isLoggedIn = false,
  username = "Guest",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  notificationCount = 0,
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleCreateListing = () => {
    navigate("/create-listing");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center px-4">
        <button
          className="mr-2 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>

        <Link to="/" className="mr-6 flex items-center space-x-2">
          <img
            src="/tradehypelogo.png"
            alt="Trade Hive Logo"
            className="h-12 w-12 rounded-full"
          />
          <span className="font-bold text-xl">HYBE</span>
        </Link>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:gap-x-12">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80">Home</Link>
            <Link to="/categories/side-hustles" className="transition-colors hover:text-foreground/80">Side Hustles</Link>
            <Link to="/categories/experiences" className="transition-colors hover:text-foreground/80">Experiences</Link>
            <Link to="/categories/rentals" className="transition-colors hover:text-foreground/80">Rentals</Link>
            <Link to="/categories/digital-services" className="transition-colors hover:text-foreground/80">Digital Services</Link>
          </nav>

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services..."
              className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative hidden md:flex">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Button>

              <Button variant="ghost" size="icon" className="relative hidden md:flex">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Button>

              <Button variant="ghost" size="icon" className="relative hidden md:flex">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>

              <Button variant="ghost" size="icon" className="relative hidden md:flex">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                    {notificationCount}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{username}</p>
                      <p className="text-xs leading-none text-muted-foreground">student@university.lk</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Listings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={handleCreateListing} size="sm" className="hidden md:inline-flex">
                Create Listing
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={handleLogin} className="hidden md:inline-flex">
                Sign In
              </Button>
              <Button size="sm" onClick={handleRegister}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-b bg-background p-4 md:hidden">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search services..." className="w-full pl-8" />
            </div>
          </div>
          <nav className="grid gap-2">
            <Link to="/" className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/categories/side-hustles" className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Side Hustles</Link>
            <Link to="/categories/experiences" className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Experiences</Link>
            <Link to="/categories/rentals" className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Rentals</Link>
            <Link to="/categories/digital-services" className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent" onClick={() => setIsMenuOpen(false)}>Digital Services</Link>
            {isLoggedIn && (
              <>
                <Link to="/profile" className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                  <User className="mr-2 h-4 w-4" />Profile
                </Link>
                <Link to="/messages" className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                  <MessageSquare className="mr-2 h-4 w-4" />Messages
                </Link>
                <Link to="/favorites" className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                  <Heart className="mr-2 h-4 w-4" />Favorites
                </Link>
                <Button onClick={() => { handleCreateListing(); setIsMenuOpen(false); }} className="mt-2 w-full">
                  Create Listing
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
