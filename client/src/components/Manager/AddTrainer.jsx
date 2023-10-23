import React, { useState } from "react";
import { createTrainer } from "../../api/api";

const AddTrainer = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const trainer = { name, bio, expertise };
      await createTrainer(trainer);
      setName("");
      setBio("");
      setExpertise("");
      setError("");
      alert("Trainer added successfully!");
    } catch (error) {
      console.error("Error adding trainer:", error);
      setError("Failed to add trainer. Please try again.");
    }
  };

  return (
    <div className="bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Add New Trainer</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="trainer-name"
            className="block text-gray-700 font-bold mb-2">
            Trainer Name:
          </label>
          <input
            id="trainer-name"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="trainer-bio"
            className="block text-gray-700 font-bold mb-2">
            Trainer Bio:
          </label>
          <textarea
            id="trainer-bio"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            required></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="trainer-expertise"
            className="block text-gray-700 font-bold mb-2">
            Trainer Expertise:
          </label>
          <input
            id="trainer-expertise"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={expertise}
            onChange={(event) => setExpertise(event.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Trainer
        </button>
      </form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default AddTrainer;
