import React, { useEffect, useState } from "react";
import headerBg from "../assets/images/header-bg.jpg";
import BlogCard from "../components/Blog/BlogCard";
import ClientRegistrationModal from "../components/Users/ClientRegistrationModal";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setUser, authFunctions, user, login } = useAuth();

  // const { user } = useAuth();

  useEffect(() => {
    // Fetch blog posts from database using API call
    // TODO: Figure out why this no work as import from api/api.jsx
    // TODO: Says either data oe blogposts is undefined
    const fetchBlogPosts = async () => {
      const response = await fetch(
        import.meta.env.VITE_SITE_URL + "/api/blogposts",
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setBlogPosts(data);
    };

    fetchBlogPosts().catch((error) => {
      console.error("Error fetching blog posts:", error);
    });
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center py-32 px-8 text-center"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <h1 className="text-5xl font-bold text-white relative z-10 mb-4">
          Welcome to High Street Gym
        </h1>
        <p className="text-2xl font-semibold text-white relative z-10 mb-8">
          Your ultimate fitness destination in Brisbane
        </p>
        {/* Display Join button only when user not logged in */}
        {!user && (
          <button
            className="bg-yellow-600 text-white py-2 px-8 rounded-lg hover:bg-yellow-500 relative z-10"
            onClick={() => setIsModalOpen(true)}
          >
            Join Us Now!
          </button>
        )}
      </section>

      {/* ABOUT US SECTION */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">About Us</h2>
          <p className="text-xl leading-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            finibus commodo metus. Nam semper elementum commodo. Vivamus commodo
            vitae nunc nec vestibulum. Sed molestie libero eget mi auctor, a
            auctor velit tincidunt. In quis hendrerit ante. Proin a aliquet
            lorem. Maecenas vulputate, nibh nec varius aliquam, elit nisi
            commodo elit, eget pellentesque tortor lectus non dolor. Nullam et
            neque eu massa placerat viverra eu at orci. Maecenas aliquet odio id
            ipsum fringilla, ut iaculis mauris porttitor.
          </p>
        </div>
      </section>

      {/* LATEST BLOG POSTS */}
      <section className="bg-gray-100 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/* CHANGED TO REMOVE UL */}
            {/* <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"> */}
            {/* Render BlogCard component for each blog post */}
            {/* Get the last 3 posts with -3 */}
            {blogPosts.slice(-3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Handle the modal behaviour */}
      {isModalOpen && (
        <ClientRegistrationModal closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
