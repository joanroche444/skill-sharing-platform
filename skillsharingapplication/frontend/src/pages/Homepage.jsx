// HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // new: error handling

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [postsRes, plansRes] = await Promise.all([
          axios.get("/api/skill-posts"),
          axios.get("/api/learning-plans"),
        ]);

        const postsData = Array.isArray(postsRes.data) ? postsRes.data : [];
        const plansData = Array.isArray(plansRes.data) ? plansRes.data : [];

        setPosts(postsData);
        setPlans(plansData);
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 p-6 space-y-10">
        <h1 className="text-3xl font-bold text-center">Welcome to SkillShare!</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Skill Sharing Posts */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Latest Skill Posts</h2>
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    {post.mediaType === "image" ? (
                      <img
                        src={post.mediaUrl}
                        alt="Skill Post"
                        className="rounded-xl mb-3 w-full max-h-48 object-cover"
                      />
                    ) : (
                      <video
                        src={post.mediaUrl}
                        controls
                        className="rounded-xl mb-3 w-full max-h-48"
                      />
                    )}
                    <p className="text-sm text-gray-800 mb-2">{post.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>By: {post.author}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No skill posts available.</p>
          )}
        </section>

        {/* Learning Plans */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Learning Plans</h2>
          {plans.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id}>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{plan.title}</h3>
                    <p className="text-sm text-gray-700 mt-1">{plan.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Topics: {Array.isArray(plan.topics) ? plan.topics.join(", ") : "N/A"}
                    </div>
                    <Button className="mt-3" variant="outline">
                      View Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No learning plans available.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
