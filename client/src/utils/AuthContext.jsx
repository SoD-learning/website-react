import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Creates context for authentication
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SITE_URL + "/api/auth/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const { user } = await response.json();
      setUser(user);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken) => {
    localStorage.setItem("authToken", newToken);
    fetchUser(newToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  const authFunctions = { fetchUser, login, logout, isAuthenticated };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        authFunctions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// // Creates context for authentication
// function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (token) {
//       fetchUser(token);
//     } else {
//       setLoading(false);
//     }
//   }, []);

// const fetchUser = async (token) => {
//   try {
//     const response = await fetch(
//       import.meta.env.VITE_SITE_URL + "/api/auth/user",
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch user data");
//     }

//     const { user } = await response.json();
//     setUser(user);
//   } catch (error) {
//     console.error(error);
//     localStorage.removeItem("authToken");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <AuthContext.Provider
//       value={{ user, setUser, isLoading, authFunctions: { fetchUser } }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export { AuthProvider };
