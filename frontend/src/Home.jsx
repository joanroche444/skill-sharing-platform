"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, PencilLine } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 text-gray-800 px-6 py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
          Welcome to Our Community
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          A place where you can <span className="font-semibold text-indigo-600">share ideas</span>,
          spark conversations, and grow together.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-lg"
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="mt-20 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto"
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center w-14 h-14 mx-auto bg-indigo-100 text-indigo-600 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Closing CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-24 bg-indigo-600 rounded-3xl px-10 py-12 text-center text-white max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to share your first post?
        </h2>
        <p className="text-lg mb-6">
          Every voice matters. Join a growing community that believes in meaningful connections.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold text-lg shadow-md"
        >
          Create a Post
        </motion.button>
      </motion.section>
    </main>
  );
}

const features = [
  {
    icon: <PencilLine size={28} />,
    title: "Post Freely",
    description: "Share your thoughts, tips, or anything that inspires you. Your post could spark someone's day.",
  },
  {
    icon: <MessageCircle size={28} />,
    title: "Engage & Comment",
    description: "Start conversations and build bridges. Comment, like, and uplift others in the community.",
  },
  {
    icon: <Users size={28} />,
    title: "Grow Together",
    description: "This is more than a feed—it's a space for belonging, growth, and real human connection.",
  },
];
