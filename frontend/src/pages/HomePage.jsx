// HomePage.jsx - Main component
import { useState, useEffect } from 'react';
import Header from '../components/user/Header';
import HeroSection from '../components/user/HeroSection';
import CategorySection from '../components/user/CategorySection';
import PostsSection from '../components/user/PostSection';
import HowItWorksSection from '../components/user/HowItWorksSection';
import CTASection from '../components/user/CTASection';
import StatsSection from '../components/user/StateSection';
import Footer from '../components/user/Footer';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    categories: false,
    posts: false,
    howItWorks: false,
    cta: false,
    stats: false
  });

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = ['hero', 'categories', 'posts', 'howItWorks', 'cta', 'stats'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    // Simulate fetching posts from API
    const fetchPosts = async () => {
      try {
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
              type: 'skill-sharing',
              category: 'Photography'
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
              type: 'progress-update',
              category: 'Coding'
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
              type: 'learning-plan',
              category: 'Cooking'
            },
            {
              id: 4,
              username: 'design_thinker',
              avatar: '/api/placeholder/40/40',
              title: 'From Sketches to Digital Art - My Weekly Progress',
              description: 'I\'ve been transitioning from traditional sketching to digital art. Here\'s my weekly progress and some tips for beginners looking to make the same journey.',
              images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
              likes: 156,
              comments: 42,
              timeAgo: '3 days ago',
              type: 'progress-update',
              category: 'Design'
            },
            {
              id: 5,
              username: 'music_maestro',
              avatar: '/api/placeholder/40/40',
              title: 'Piano Learning Roadmap for Beginners',
              description: 'After teaching piano for 5 years, I\'ve compiled the perfect roadmap for beginners. This structured approach will take you from zero to playing your first song in 30 days.',
              images: ['/api/placeholder/600/400'],
              likes: 178,
              comments: 29,
              timeAgo: '4 days ago',
              type: 'learning-plan',
              category: 'Music'
            },
            {
              id: 6,
              username: 'diy_enthusiast',
              avatar: '/api/placeholder/40/40',
              title: 'Building Your Own Herb Garden: Step by Step',
              description: 'I\'ve documented my entire process of building a vertical herb garden for my apartment balcony. Great for urban gardeners with limited space!',
              images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
              likes: 92,
              comments: 18,
              timeAgo: '1 week ago',
              type: 'skill-sharing',
              category: 'DIY'
            }
          ]);
          setIsLoading(false);
          // Automatically animate the first section after loading
          setIsVisible(prev => ({ ...prev, hero: true }));
        }, 800);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Calculate filtered posts based on active category
  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      
      <HeroSection isVisible={isVisible.hero} />
      
      <CategorySection 
        isVisible={isVisible.categories} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <PostsSection 
        isVisible={isVisible.posts}
        posts={filteredPosts}
        isLoading={isLoading}
        activeCategory={activeCategory}
      />
      
      <HowItWorksSection isVisible={isVisible.howItWorks} />
      
      <CTASection isVisible={isVisible.cta} />
      
      <StatsSection isVisible={isVisible.stats} />
      
      <Footer />
      
      {/* Animation keyframes */}
     <style jsx="true">{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  .animate-fade-in-right {
    animation: fadeInRight 0.6s ease-out forwards;
  }
`}</style>
    </div>
  );
}

export default HomePage;