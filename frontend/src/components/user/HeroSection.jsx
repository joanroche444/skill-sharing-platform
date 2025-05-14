// components/HeroSection.jsx
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const HeroSection = ({ isVisible }) => {
  return (
    <div id="hero" className="relative bg-indigo-800 overflow-hidden">
      <div 
        className={`transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/api/placeholder/1200/400"
            alt="People sharing skills"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-purple-900/80 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-right">
            Share Skills. <br className="hidden md:inline" />
            <span className="text-indigo-300">Grow Together.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-indigo-100 animate-fade-in-up">
            Join our community where passionate learners share their journey, track progress, and create structured learning paths together.
          </p>
          <div className="mt-10 animate-fade-in-up">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Start Sharing Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="#categories"
              className="inline-flex items-center ml-4 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            >
              Explore Skills
            </a>
          </div>
          
          {/* Animated decorative elements */}
          <div className="hidden md:block absolute -bottom-8 right-12 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="hidden md:block absolute -top-16 -left-8 w-40 h-40 bg-indigo-300 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="hidden md:block absolute top-1/3 right-1/3 w-20 h-20 bg-indigo-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;