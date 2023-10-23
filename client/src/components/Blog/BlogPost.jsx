import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../Modal";
import CreateEditBlog from "./CreateEditBlog";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [postUpdated, setPostUpdated] = useState(false);
  const { user } = useAuth();

  // Fetch specific blog post
  const fetchPost = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SITE_URL + `/api/blogposts/${id}`,
      );
      if (!response.ok) {
        throw new Error("Error fetching blog post");
      }
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id, postUpdated]);

  // Refresh the blog post after a change
  const refreshBlogPosts = () => {
    fetchBlogPosts();
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handlePostUpdated = () => {
    setPostUpdated(true);
    setShowEditModal(false);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowEditModal(false);
    setPostUpdated(true);
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center mb-2 pb-3">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-600"></div>
        <span className="ml-2">Loading post ...</span>
      </div>
    );
  }

  return (
    <>
      <div className="my-10 mx-20">
        <Link to="/blog" className="text-blue-600 hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-screen-lg mx-auto sm:px-6 lg:px-8 my-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          {user && user.id === post.author_id && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              onClick={handleEditClick}
            >
              Edit Post
            </button>
          )}
        </div>
        <p className="text-gray-600 whitespace-pre-wrap sm:text-base lg:text-lg xl:text-xl">
          {post.content}
        </p>
        {showEditModal && (
          <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
            <CreateEditBlog
              postId={post.id}
              initialTitle={post.title}
              initialContent={post.content}
              onPostUpdated={refreshBlogPosts}
              onClose={handleCloseModal}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default BlogPost;
