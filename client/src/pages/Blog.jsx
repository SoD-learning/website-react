import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blog/BlogCard";
import CreateEditBlog from "../components/Blog/CreateEditBlog";
import Modal from "../components/Modal";
import { useAuth } from "../hooks/useAuth";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { user } = useAuth();
  const isManager = user && user.role === "manager";

  // Fetch blog posts from database using API call
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

  useEffect(() => {
    fetchBlogPosts().catch((error) => {
      console.error("Error fetching blog posts:", error);
    });
  }, []);

  // Refresh the blog posts after a change
  const refreshBlogPosts = () => {
    fetchBlogPosts();
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Blog</h1>
          {/* Show "Create Blog Post" button if user is logged in */}
          {user && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              onClick={handleCreateClick}
            >
              Create Blog Post
            </button>
          )}
        </div>
        {showCreateModal && (
          <Modal
            show={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          >
            <CreateEditBlog
              onClose={() => setShowCreateModal(false)}
              onPostCreated={refreshBlogPosts}
            />
          </Modal>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Render BlogCard component for each blog post */}
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              isManager={isManager}
              onDelete={refreshBlogPosts}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;

// import React, { useEffect, useState } from "react";
// import BlogCard from "../components/Blog/BlogCard";
// import CreateEditBlog from "../components/Blog/CreateEditBlog";
// import { useAuth } from "../hooks/useAuth";

// const Blog = () => {
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
// const [isModalOpen, setIsModalOpen] = useState(false);

//   const { user } = useAuth();

//   useEffect(() => {
//     // Fetch blog posts from database using API call
//     const fetchBlogPosts = async () => {
//       const response = await fetch(
//         import.meta.env.VITE_SITE_URL + "/api/blogposts",
//       );
//       if (!response.ok) {
//         throw new Error("Error fetching data");
//       }
//       const data = await response.json();
//       setBlogPosts(data);
//     };

//     fetchBlogPosts().catch((error) => {
//       console.error("Error fetching blog posts:", error);
//     });
//   }, []);

//   const handleCreateClick = () => {
//     setShowCreateModal(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Main content */}
//       <main className="container mx-auto px-4 py-8 max-w-7xl">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Blog</h1>
//           {/* Show "Create Blog Post" button if user is logged in */}
//           {user && (
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
//               onClick={handleCreateClick}
//             >
//               Create Blog Post
//             </button>
//           )}
//         </div>
//         {showCreateModal && (
//           <CreateEditBlog onClose={() => setShowCreateModal(false)} />
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {/* Render BlogCard component for each blog post */}
//           {blogPosts.map((post) => (
//             <BlogCard key={post.id} post={post} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Blog;
