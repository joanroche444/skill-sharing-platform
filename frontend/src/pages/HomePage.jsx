import { useState, useEffect } from 'react';
import { Search, User, Bell, BookOpen, Share2, TrendingUp, Menu, X, LogIn } from 'lucide-react';

 function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching posts from API
    const fetchPosts = async () => {
      try {
        // Replace with actual API call when backend is ready
        setIsLoading(true);
        // Simulating network delay
        setTimeout(() => {
          setPosts([
            {
              id: 1,
              username: 'photography_expert',
              avatar: '/api/placeholder/40/40',
              title: 'Advanced Composition in Photography',
              description: 'Learn how to use the rule of thirds effectively in landscape photography. I\'ve been practicing this technique for months and here are my results.',
              images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
              likes: 125,
              comments: 24,
              timeAgo: '2 hours ago',
              type: 'skill-sharing'
            },
            {
              id: 2,
              username: 'coding_ninja',
              avatar: '/api/placeholder/40/40',
              title: 'My React Learning Journey - Month 3',
              description: 'Just completed building my first full-stack application with React and Spring Boot! Here\'s what I\'ve learned so far and my roadmap for the next steps.',
              images: ['/api/placeholder/600/400'],
              likes: 89,
              comments: 15,
              timeAgo: '5 hours ago',
              type: 'progress-update'
            },
            {
              id: 3,
              username: 'culinary_adventures',
              avatar: '/api/placeholder/40/40',
              title: '30-Day Baking Challenge: Learning Plan',
              description: 'I\'ve created a structured plan to master basic baking skills in 30 days. Starting with simple cookies and working up to complex pastries. Here\'s my detailed schedule and resource list!',
              images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
              likes: 204,
              comments: 37,
              timeAgo: '1 day ago',
              type: 'learning-plan'
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getPostBadge = (type) => {
    switch (type) {
      case 'skill-sharing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Share2 className="w-3 h-3 mr-1" />
            Skill Share
          </span>
        );
      case 'progress-update':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <TrendingUp className="w-3 h-3 mr-1" />
            Progress Update
          </span>
        );
      case 'learning-plan':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <BookOpen className="w-3 h-3 mr-1" />
            Learning Plan
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">SkillShare</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Explore
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Learning Plans
                </a>
              </div>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="search"
                  placeholder="Search skills, users..."
                />
              </div>
              
              {isAuthenticated ? (
                <>
                  <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/api/placeholder/32/32"
                          alt="User profile"
                        />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setIsAuthenticated(true)}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              )}
            </div>
            
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Explore
              </a>
              <a
                href="#"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Learning Plans
              </a>
              
              {!isAuthenticated && (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <a
                    href="/signup"
                    onClick={() => setIsAuthenticated(true)}
                    className="bg-indigo-600 text-white block text-center mx-4 px-4 py-2 rounded-md text-base font-medium"
                  >
                    Sign In
                  </a>
                </div>
              )}
            </div>
            
            {isAuthenticated && (
              <>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="/api/placeholder/40/40"
                        alt="User profile"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">John Doe</div>
                      <div className="text-sm font-medium text-gray-500">john@example.com</div>
                    </div>
                    <button className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">View notifications</span>
                      <Bell className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      onClick={() => setIsAuthenticated(false)}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/api/placeholder/1200/400"
            alt="People sharing skills"
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Share Skills. Grow Together.</h1>
          <p className="mt-6 max-w-2xl text-xl text-indigo-100">
            Join our community where passionate learners share skills, track progress, and create learning paths together.
          </p>
          <div className="mt-10">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Sharing Now
            </a>
            <a
              href="#"
              className="inline-flex items-center ml-4 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Explore Skills
            </a>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Discover Skills in Various Categories
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Browse through popular categories and find skills that interest you. Learn from experts and enthusiasts alike.
              </p>
              <div className="mt-8 sm:flex">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    View All Categories
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:gap-8">
              {['Coding', 'Cooking', 'Photography', 'Design', 'Music', 'DIY'].map((category) => (
                <div key={category} className="col-span-1 flex justify-center py-8 px-8 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <p className="text-lg font-medium text-gray-900">{category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Feed */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
          <div className="flex space-x-4">
            <button className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Recent
            </button>
            <button className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Popular
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white shadow rounded-lg p-6 animate-pulse">
                <div className="flex space-x-4">
                  <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 h-48 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow overflow-hidden rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-12 w-12 rounded-full" src={post.avatar} alt={post.username} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">@{post.username}</div>
                      <div className="text-sm text-gray-500">{post.timeAgo}</div>
                    </div>
                    <div className="ml-auto">
                      {getPostBadge(post.type)}
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{post.description}</p>
                </div>
                <div className="border-t border-gray-200">
                  <div className={`grid grid-cols-${post.images.length} gap-1`}>
                    {post.images.map((image, idx) => (
                      <div key={idx} className="aspect-w-16 aspect-h-9">
                        <img
                          className="w-full h-48 object-cover"
                          src={image}
                          alt={`Post image ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {post.likes}
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                        {post.comments}
                      </button>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                      View Full Post
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 flex justify-center">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Load More
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16">
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
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-indigo-500 flex items-center justify-center">
                    <Share2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">1. Share Your Skills</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Upload photos or videos of your work. Add descriptions and tips to help others learn from your experience.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-indigo-500 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">2. Track Your Progress</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Document your learning journey. Use our templates to track completed tutorials and newly acquired skills.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-indigo-500 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">3. Create Learning Plans</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Design structured learning paths with topics, resources, and timelines. Update as you make progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start sharing?</span>
            <span className="block">Join our community today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Connect with passionate learners, share your expertise, and embark on new learning adventures.
          </p>
          <a
            href="#"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Sign up for free
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                About
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Blog
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Jobs
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Press
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Privacy
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Terms
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Contact
              </a>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2025 SkillShare Learning Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;


