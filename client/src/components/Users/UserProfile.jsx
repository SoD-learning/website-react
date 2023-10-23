import React, { useState } from "react";
import { FaPenFancy } from "react-icons/fa";
import { updateTrainer } from "../../api/api";
import defaultPicture from "../../assets/images/trainer-bruno.jpg";
import { useAuth } from "../../hooks/useAuth";

const UserProfile = ({ chosenUser }) => {
  const [showEditing, setShowEditing] = useState(false);
  const [showEditBio, setShowEditBio] = useState(false);
  const [showEditExpertise, setShowEditExpertise] = useState(false);
  // Edit profile if user's viewing own profile
  const [editedBio, setEditedBio] = useState(chosenUser.bio || "");
  const [editedExpertise, setEditedExpertise] = useState(
    chosenUser.expertise || "",
  );
  const existingBio = chosenUser.bio;
  const existingExpertise = chosenUser.expertise;
  const { user } = useAuth();

  // Edit profile
  // TODO: Fix so that user can update BOTH bio and expertise at once
  const handleEditBioClick = () => {
    setShowEditBio(true);
  };

  const handleEditExpertiseClick = () => {
    setShowEditExpertise(true);
  };

  const handleBioChange = (e) => {
    setEditedBio(e.target.value);
  };

  const handleExpertiseChange = (e) => {
    setEditedExpertise(e.target.value);
  };

  const handleSubmitBio = () => {
    setShowEditBio(false);
    updateTrainer(user.id, editedBio, chosenUser.expertise);
    // TODO: send updated into to TrainerDashboard
  };
  const handleSubmitExpertise = () => {
    setShowEditExpertise(false);
    updateTrainer(user.id, chosenUser.bio, editedExpertise);
    // TODO: send updated into to TrainerDashboard
  };

  return (
    <div className="p-6 space-y-4">
      <img
        src={chosenUser.profile_picture || defaultPicture}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto border-2 border-gray-300"
      />
      <h2 className="text-2xl mt-4 mb-2 text-center font-semibold">
        {chosenUser.name || "Not available"}
      </h2>

      <div className="space-y-2">
        <h3 className="text-xl mb-2 font-semibold">
          Bio{" "}
          {user && user.name === chosenUser.name && (
            <FaPenFancy onClick={handleEditBioClick} className="inline" />
          )}
        </h3>
        {/* Edit profile */}
        {showEditBio ? (
          <form onSubmit={handleSubmitBio}>
            <input
              className="border-2"
              type="text"
              value={editedBio}
              onChange={handleBioChange}
            />
            <button
              className="bg-blue-500 text-white px-4 py-1 mx-2 rounded"
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-gray-600">{editedBio || "Not available"}</p>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl mb-2 font-semibold">
          Expertise{" "}
          {user && user.name === chosenUser.name && (
            <FaPenFancy onClick={handleEditExpertiseClick} className="inline" />
          )}
        </h3>
        {/* Edit profile */}
        {showEditExpertise ? (
          <form onSubmit={handleSubmitExpertise}>
            <input
              className="border-2"
              type="text"
              value={editedExpertise}
              onChange={handleExpertiseChange}
            />
            <button
              className="bg-blue-500 text-white px-4 py-1 mx-2 rounded"
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-gray-600">{editedExpertise || "Not available"}</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
