import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [postsRes, plansRes] = await Promise.all([
          axios.get("/api/skill-posts"),
          axios.get("/api/learning-plans"),
        ]);
        setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);
        setPlans(Array.isArray(plansRes.data) ? plansRes.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchContent();
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
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-3">Welcome to TalentHive</h1>
        <p className="text-lg mb-6">Elevate your skills with personalized learning plans</p>
        <Button
  className="bg-blue-700 hover:bg-black-50 font-semibold px-8 py-4 rounded-full shadow-md"
  onClick={() => navigate("/create-plan")}
>
  + Create Your Own Plan
</Button>

      </section>

      <main className="p-6 space-y-10">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Learning Plans Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Explore Top Skill Learning Plans</h2>
          {plans.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id}>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{plan.title}</h3>
                    <p className="text-sm text-gray-700">{plan.description}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      Topics: {Array.isArray(plan.topics) ? plan.topics.join(", ") : "N/A"}
                    </div>
                    <Button variant="outline" className="mt-3">
                      View Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 text-center">No learning plans available.</p>
          )}
        </section>
      </main>
    </div>
  );
}
