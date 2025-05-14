// components/StatsSection.jsx

const StatsSection = ({ isVisible }) => {
  const stats = [
    {
      value: "10,000+",
      label: "Active Users",
      animation: "count-up"
    },
    {
      value: "50+",
      label: "Skill Categories",
      animation: "count-up"
    },
    {
      value: "25,000+",
      label: "Shared Posts",
      animation: "count-up"
    },
    {
      value: "4.8/5",
      label: "User Rating",
      animation: "flip"
    }
  ];

  return (
    <div id="stats" className={`bg-white py-12 transition-all duration-1000 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Community in Numbers</h2>
          <p className="mt-2 text-lg text-gray-500">Join thousands of learners sharing skills every day</p>
        </div>
        
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ 
                animationDelay: `${index * 200}ms`,
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.2}s forwards` : 'none'
              }}
            >
              <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Growth illustration */}
        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-3xl p-6 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <div className="text-sm font-medium text-gray-500">Community Growth</div>
              <div className="text-sm font-medium text-green-600">+48.8%</div>
            </div>
            <div className="relative h-12">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month, idx) => (
                <div 
                  key={idx}
                  className="absolute bottom-0 bg-indigo-600 rounded-t-sm w-1/12 transition-all duration-1000 ease-out"
                  style={{ 
                    left: `${idx * 8.33}%`, 
                    height: isVisible ? `${20 + Math.floor(Math.random() * 20) + (idx * 4)}%` : '0%',
                    transitionDelay: `${idx * 100}ms`
                  }}
                >
                  <div className="absolute bottom-full w-full text-center text-xs text-gray-600 mb-1">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;