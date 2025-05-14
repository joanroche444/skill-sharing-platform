// components/CategorySection.jsx
import { Award } from 'lucide-react';

const CategorySection = ({ isVisible, activeCategory, setActiveCategory }) => {
  const categories = [
    { 
      name: 'All', 
      icon: <Award className="w-6 h-6 mb-2" /> 
    }, 
    { 
      name: 'Coding', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> 
    },
    { 
      name: 'Design', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg> 
    },
    { 
      name: 'Photography', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> 
    },
    { 
      name: 'Music', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg> 
    },
    { 
      name: 'Cooking', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg> 
    },
    { 
      name: 'DIY', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> 
    }
  ];

  return (
    <div 
      id="categories" 
      className={`bg-white transition-all duration-1000 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Discover Skills in Various Categories
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Browse through popular categories and find skills that interest you.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full ${
                activeCategory === category.name 
                  ? 'bg-indigo-100 text-indigo-800 shadow-md' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${
                activeCategory === category.name 
                  ? 'text-indigo-600' 
                  : 'text-gray-500'
              }`}>
                {category.icon}
              </div>
              <p className="font-medium text-sm">{category.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;