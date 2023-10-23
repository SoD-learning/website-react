import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

// Hook to manage authentication
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, isLoading, authFunctions } = context;
  const { login } = authFunctions;

  return { user, setUser, isLoading, login };
}

// import { useContext } from "react";
// import { AuthContext } from "../utils/AuthContext";

// // Hook to manage authentication
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return { context };
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
