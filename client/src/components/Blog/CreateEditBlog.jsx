import React, { useEffect, useState } from "react";
import { createBlogPost, updateBlogPost } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

const CreateEditBlog = ({
  postId,
  initialTitle,
  initialContent,
  onClose,
  onPostCreated,
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");
  const { user } = useAuth() || {};

  useEffect(() => {
    if (user) {
      setAuthor(user.id);
    }
  }, [user]);

  const [author, setAuthor] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author) {
      // Handle error: user not logged in or unavailable
      console.error("User is not logged in or unavailable");
      return;
    }

    if (postId) {
      await updateBlogPost(postId, title, content);
    } else {
      await createBlogPost(title, content, author);
      onPostCreated();
    }

    onClose();
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        {postId ? "Edit" : "Create"} Blog Post
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Title</span>
          <input
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Content</span>
          <textarea
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </label>
        <div className="flex justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            type="submit"
          >
            {postId ? "Update" : "Create"} Post
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateEditBlog;
