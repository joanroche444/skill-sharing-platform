// components/CTASection.jsx
import { Link } from 'react-router-dom';

const CTASection = ({ isVisible }) => {
  return (
    <div 
      id="cta" 
      className={`bg-gradient-to-r from-indigo-700 to-purple-700 transition-all duration-1000 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-500 opacity-20 mix-blend-multiply animate-float"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-indigo-500 opacity-20 mix-blend-multiply animate-float-delay"></div>
      
      <div className="relative max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to start sharing?</span>
          <span className="block mt-2">Join our community today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-indigo-200">
          Connect with passionate learners, share your expertise, and embark on new learning adventures.
        </p>
        <div className="mt-8">
          <Link
            to="/signup"
            className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Sign up for free
          </Link>
          <p className="mt-3 text-sm text-indigo-200">
            No credit card required. Start sharing in minutes.
          </p>
        </div>
        
        {/* Featured users */}
        <div className="mt-10">
          <div className="flex -space-x-2 justify-center">
            {[1, 2, 3, 4, 5].map(idx => (
              <img
                key={idx}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={`/api/placeholder/32/32?random=${idx}`}
                alt={`User ${idx}`}
              />
            ))}
            <span className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-indigo-500 text-xs text-white font-medium">
              +5k
            </span>
          </div>
          <p className="mt-3 text-sm text-indigo-200">
            Join thousands of learners already sharing skills
          </p>
        </div>
      </div>
      
   
    </div>
  );
};

export default CTASection;