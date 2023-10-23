import React from "react";
import UserProfile from "./UserProfile";

const UserProfileModal = ({ chosenUser, closeModal }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <button
              onClick={closeModal}
              className="absolute text-5xl top-2 right-2 text-gray-500 hover:text-gray-600"
            >
              &times;
            </button>
            <UserProfile chosenUser={chosenUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
