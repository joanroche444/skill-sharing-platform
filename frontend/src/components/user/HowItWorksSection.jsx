// components/HowItWorksSection.jsx
import { Share2, TrendingUp, BookOpen } from 'lucide-react';

const HowItWorksSection = ({ isVisible }) => {
  const steps = [
    {
      icon: <Share2 className="h-6 w-6 text-white" />,
      iconBg: "bg-indigo-500",
      title: "1. Share Your Skills",
      description: "Upload photos or videos of your work. Add descriptions and tips to help others learn from your experience.",
      iconLarge: <Share2 className="h-16 w-16 text-indigo-900" />,
      delay: '0ms',
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      iconBg: "bg-blue-500",
      title: "2. Track Your Progress",
      description: "Document your learning journey. Use our templates to track completed tutorials and newly acquired skills.",
      iconLarge: <TrendingUp className="h-16 w-16 text-blue-900" />,
      delay: '200ms',
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      iconBg: "bg-purple-500",
      title: "3. Create Learning Plans",
      description: "Design structured learning paths with topics, resources, and timelines. Update as you make progress.",
      iconLarge: <BookOpen className="h-16 w-16 text-purple-900" />,
      delay: '400ms',
    }
  ];

  return (
    <div 
      id="howItWorks" 
      className={`bg-gray-50 py-16 transition-all duration-1000 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How Our Platform Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Share your skills, track your progress, and learn from others in three simple steps.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 duration-300"
                style={{ animationDelay: step.delay }}
              >
                <div className={`absolute h-1.5 w-full ${step.iconBg.replace('bg-', 'bg-')} top-0 left-0`}></div>
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-md ${step.iconBg} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {step.description}
                  </p>
                </div>
                <div className="absolute right-4 bottom-4 opacity-10">
                  {step.iconLarge}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Interactive element */}
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Learn More About Our Process
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;