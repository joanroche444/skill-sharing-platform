import React from "react";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = ({ className } = {}) => {
  return (
    <footer className={cn("w-full bg-gray-900 text-gray-200 py-10", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Hybe</h3>
            <p className="text-sm text-gray-400">
              A marketplace platform where students can showcase, sell, and rent
              their services, products, and experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Side Hustles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Rentals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Digital Services
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@hybe.lk</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Colombo 07, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Hybe. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ by students, for students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
