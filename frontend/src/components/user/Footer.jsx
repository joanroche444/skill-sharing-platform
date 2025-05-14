// components/Footer.jsx

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "About Us", href: "#" },
        { name: "Features", href: "#" },
        { name: "Community", href: "#" },
        { name: "Blog", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" }
      ]
    },
    {
      title: "Categories",
      links: [
        { name: "Coding", href: "#" },
        { name: "Design", href: "#" },
        { name: "Photography", href: "#" },
        { name: "Music", href: "#" }
      ]
    },
    {
      title: "Connect with us",
      links: [
        { 
          name: "Twitter", 
          href: "#", 
          icon: <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        },
        { 
          name: "GitHub", 
          href: "#",
          icon: <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.527 2.34 1.086 2.912.831.092-.647.35-1.086.636-1.336-2.22-.251-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.254-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0110 2.835c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.378.203 2.396.1 2.65.64.7 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
          </svg>
        },
        { 
          name: "YouTube", 
          href: "#",
          icon: <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm6.064 4.872a7.96 7.96 0 012.262 5.128c0 4.411-3.589 8-8 8a7.96 7.96 0 01-5.128-2.263A7.96 7.96 0 016.872 3.936 7.96 7.96 0 0110 2c4.411 0 8 3.589 8 8a7.96 7.96 0 01-1.936 5.192zM8 6v8l6-4-6-4z" clipRule="evenodd" />
          </svg>
        }
      ]
    }
  ];
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href={link.href} className="text-base text-gray-600 hover:text-gray-900 flex items-center">
                      {link.icon && link.icon}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-base text-gray-400">
              &copy; {currentYear} TeadeHive Learning Platform. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Made with passion for learners worldwide
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors duration-300">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors duration-300">Terms</a>
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors duration-300">Cookies</a>
          </div>
        </div>
        
  
        
       
      </div>
    </footer>
  );
};

export default Footer;