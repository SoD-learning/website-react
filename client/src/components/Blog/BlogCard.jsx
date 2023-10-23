import { useNavigate } from "react-router-dom";
import { deleteBlogPost } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

const BlogCard = ({ post, isManager, onDelete }) => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  const handleDelete = async (postId) => {
    try {
      await deleteBlogPost(postId);
      onDelete();
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div
      className="bg-white p-8 rounded-lg shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>
      <p className="py-4 pb-0">
        {/* Check if user exists and user.role is "manager" before rendering the button */}
        {user && isManager && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post.id);
            }}
          >
            Delete
          </button>
        )}
      </p>
    </div>
  );
};

export default BlogCard;

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// const BlogCard = ({ post }) => {
//   const navigate = useNavigate();

//   const { user, setUser } = useAuth();
//   console.log("🚀 ~ file: BlogCard.jsx:9 ~ BlogCard ~ user:", user.role);

//   const handleClick = () => {
//     navigate(`/blog/${post.id}`);
//   };

//   return (
//     <div
//       className="bg-white p-8 rounded-lg shadow-md cursor-pointer"
//       onClick={handleClick}
//     >
//       <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
//       <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>
//       <p>
//         {/* BUTTON HERE that checks for user.role = "manager" */}
//       </p>
//     </div>
//   );
// };

// export default BlogCard;
