import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroBanner from "../home/HeroBanner";
import CategoryGrid from "../home/CategoryGrid";
import FeaturedListings from "./listings/FeaturedListings";
import Footer from "../components/Footer";

const HomePage = (props) => {
  const {
    isLoggedIn = false,
    username = "Guest",
    avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
    notificationCount = 0,
  } = props;

  const handleExploreClick = () => {
    console.log("Explore marketplace clicked");
  };

  const handleListServiceClick = () => {
    console.log("List service clicked");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        avatarUrl={avatarUrl}
        notificationCount={notificationCount}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          title="Hybe: Your Campus Marketplace"
          subtitle="A one-stop platform where students can buy, sell, rent, and showcase their skills. From side hustles and digital services to event experiences and affordable rentals, we connect students with opportunities to earn, trade, and thrive."
          primaryCta={{
            text: "Explore Marketplace",
            onClick: handleExploreClick,
          }}
          secondaryCta={{
            text: "List Your Service",
            onClick: handleListServiceClick,
          }}
        />

        {/* Categories Section */}
        <CategoryGrid />

        {/* Featured Listings Section */}
        <FeaturedListings />

        {/* Additional Sections */}
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              Join Our Campus Marketplace
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              Whether you're looking to earn extra income, share your skills, or
              find affordable services, Hybe connects you with fellow
              students across campus.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign Up Now
              </Link>
              <Link
                to="/about"
                className="rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="mt-2 text-gray-600">Active Sri Lankan Students</p>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <p className="text-4xl font-bold text-primary">1,200+</p>
                <p className="mt-2 text-gray-600">Services & Products</p>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <p className="text-4xl font-bold text-primary">15+</p>
                <p className="mt-2 text-gray-600">Sri Lankan Universities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
              What Students Say
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
                    alt="Emma"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Thisen Thenuga</h4>
                    <p className="text-sm text-gray-500">
                      University of Colombo
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I've been able to fund my semester abroad by offering logo
                  design services on Hybe. The platform made it easy to
                  connect with students who needed design work!"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src="/MahindaRajapaksa6.jpg"
                    alt="Marcus"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Mahinda Rajapakse</h4>
                    <p className="text-sm text-gray-500">
                      SAB Campus - CA Sri Lanka
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Renting camera equipment through Hybe saved me hundreds
                  of dollars for my film project. The rental process was smooth
                  and the equipment was in great condition."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia"
                    alt="Sophia"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Tharindu Senarathne</h4>
                    <p className="text-sm text-gray-500">
                      University of Moratuwa
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I booked a campus tour experience through Hybe when my
                  family visited. Our guide was knowledgeable and showed us
                  hidden spots we would have never found on our own!"
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
