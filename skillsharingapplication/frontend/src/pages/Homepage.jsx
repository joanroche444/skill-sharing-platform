import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:8081/learning-plans");
        setPlans(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load plans.");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Injected CSS for Slide-In Animation */}
      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(0);
            }
          }

          .banner-slide-in {
            animation: slideIn 1s ease-out forwards;
          }
        `}
      </style>

      {/* Welcome Banner with Slide-In Effect */}
      <section className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-16 text-center banner-slide-in">
        <h1 className="text-4xl font-bold mb-3">Welcome to TalentHive</h1>
        <p className="text-lg mb-6">Elevate your skills with personalized learning plans</p>
        <Button
          className="bg-blue-800 hover:bg-blue-600 font-semibold px-8 py-4 rounded-full shadow-md transform transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/create-plan")}
        >
          + Create Your Own Learning Plan
        </Button>
      </section>

      <main className="p-6 space-y-16">
        {/* Top Skill Learning Cards */}
        <section>
          <h2 className="text-2xl text-gray-700 font-bold mb-8 text-center">Explore Top Skill Learning Plans</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-center text-grey-700">
            {[
              {
                title: "Python Programming",
                img: "https://1000logos.net/wp-content/uploads/2020/08/Python-Logo.png",
                desc: "Master the basics to advanced Python programming and scripting.",
              },
              {
                title: "Web Development",
                img: "https://jessup.edu/wp-content/uploads/2024/01/Is-Web-Development-Oversaturated.jpg",
                desc: "Learn to build responsive websites with HTML, CSS, JS and frameworks.",
              },
              {
                title: "Data Science",
                img: "https://thumbs.dreamstime.com/b/big-data-science-analysis-business-technology-concept-virtual-screen-big-data-science-analysis-business-technology-concept-145015243.jpg",
                desc: "Analyze data, create models, and visualize insights with ML tools.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{card.desc}</p>
                  <Button
                    onClick={() => navigate(
                      card.title === "Python Programming"
                        ? "/python"
                        : card.title === "Web Development"
                        ? "/web-development"
                        : "/data-science"
                    )}
                    className="bg-blue-500 text-white hover:bg-blue-600 w-half transform transition-transform duration-300 hover:scale-105"
                  >
                    More Info
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Your Learning Plans Section */}
        <section className="my-16 px-4">
          <h2 className="text-2xl text-gray-700 font-bold mb-8 text-center">Your Learning Plans</h2>
          {plans.length > 0 ? (
            <>
              <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.slice(-3).reverse().map(plan => (
                  <li
                    key={plan.id}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-blue-50"
                  >
                    <h3 className="text-xl font-bold text-blue-600 mb-2">{plan.title}</h3>
                    <p className="text-gray-600 mb-3">{plan.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-700 mb-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{plan.skill}</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{plan.learningPeriodInDays} days</span>
                    </div>
                    <button
                      onClick={() => navigate(`/edit-plan/${plan.id}`)}
                      className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => navigate("/plans")}
                  className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition"
                >
                  View All Plans
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">You haven't started any learning plans yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}
