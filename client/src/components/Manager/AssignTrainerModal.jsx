import React, { useState } from "react";

const AssignTrainerModal = ({
  trainers,
  classId,
  onAssignTrainer,
  closeModal
}) => {
  const [selectedTrainer, setSelectedTrainer] = useState("");

  const handleTrainerSelection = (event) => {
    setSelectedTrainer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedTrainer) {
      await onAssignTrainer(classId, selectedTrainer);
      // Find the selected trainer's name
      const selectedTrainerObj = trainers.find(
        (trainer) => trainer.id === selectedTrainer
      );

      if (selectedTrainerObj) {
        const trainerName = selectedTrainerObj.name;

        // Update the classes state in the ManagerDashboard component
        updateAssignedTrainer(classId, selectedTrainer, trainerName);
      }
      closeModal();
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Assign Trainer
            </h3>
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="trainer-select"
                    className="block text-gray-700 font-bold mb-2">
                    Select a Trainer:
                  </label>
                  <select
                    id="trainer-select"
                    name="trainer-select"
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleTrainerSelection}
                    value={selectedTrainer}
                    required>
                    <option value="">-- Select a Trainer --</option>
                    {trainers.map((trainer) => (
                      <option key={trainer.id} value={trainer.id}>
                        {trainer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    onClick={closeModal}>
                    {" "}
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTrainerModal;
