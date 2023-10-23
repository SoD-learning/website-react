import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogPost from "./components/Blog/BlogPost";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CenterWrapper from "./components/Wrapper/CenterPage";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Home";
import LoginForm from "./pages/Login";
import { AuthProvider } from "./utils/AuthContext";
import { requireAuth } from "./utils/requireAuth";

// Defer loading components until first time they're needed
// TODO: Too much bad juju here, will try another day
// const LoginForm = lazy(() => import("./pages/Login"));
// const Blog = lazy(() => import("./pages/Blog"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));

// const AuthenticatedComponent = requireAuth(WrappedComponent);
const AuthenticatedDashboard = requireAuth(Dashboard);

function App() {
  console.log("Rendering App component");
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Router className="flex-grow">
            <Header />
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route
                path="/login"
                element={
                  <CenterWrapper>
                    <LoginForm />
                  </CenterWrapper>
                }
              />
              {/* PRIVATE ROUTES */}
              <Route path="/dashboard" element={<AuthenticatedDashboard />} />
              {/* 404 any other routes not defined here */}
              {/* <Route
                path="*"
                element={
                  <div style={{ padding: "1rem" }}>
                    <h3>Page Not Found!</h3>
                  </div>
                }
              /> */}
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
