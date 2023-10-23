import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm mb-4 sm:mb-0">
            <p>&copy; {currentYear} High Street Gym. All rights reserved.</p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              Legal notices
            </a>
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              Accessibility
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
