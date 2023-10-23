import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// HOC uses useAuth hook to check if user is authenticated
export function requireAuth(WrappedComponent) {
  function AuthenticatedComponent(props) {
    const navigate = useNavigate();
    // Destructure the context object from useAuth
    const { isLoading, user } = useAuth();

    useEffect(() => {
      if (!isLoading && !user) {
        navigate("/login");
      }
    }, [isLoading, user, navigate]);

    if (isLoading) {
      return (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-100 mr-2" />
          <span className="text-white">Loading...</span>
        </div>
      );
    }

    // if authenticated, wrapped component is rendered
    return user ? <WrappedComponent {...props} /> : null;
  }

  return AuthenticatedComponent;
}

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// // HOC uses useAuth hook to check if user is authenticated
// export function requireAuth(WrappedComponent) {
//   function AuthenticatedComponent(props) {
//     const navigate = useNavigate();
//     // Destructure the context object from useAuth
//     const { isLoading, user } = useAuth();

//     if (isLoading) {
//       return (
//         <div className="flex items-center">
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-100 mr-2" />
//           <span className="text-white">Loading...</span>
//         </div>
//       );
//     }

//     // if not authenticated, exit early and redirect user to /login
//     if (!user) {
//       navigate("/login");
//       return null;
//     }

//     // if authenticated, wrapped component is rendered
//     return <WrappedComponent {...props} />;
//   }

//   //   return <AuthenticatedComponent />;
//   return AuthenticatedComponent;
// }
