import React, { useEffect, useState } from "react";
import {
  assignTrainerToClass,
  fetchClasses,
  fetchTrainers,
} from "../../api/api";
import generateCalendarData from "../../utils/calendarUtils";
import Timetable from "../Classes/Timetable";
import TrainerRegistrationModal from "../Users/TrainerRegistrationModal";
import UserProfileModal from "../Users/UserProfileModal";
import AssignTrainerModal from "./AssignTrainerModal";
import FileListModal from "./FileListModal";
import UploadXMLModal from "./UploadXMLModal";

const ManagerDashboard = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showTrainerRegistrationModal, setShowTrainerRegistrationModal] =
    useState(false);

  // XML goodness
  const [showUploadXMLModal, setShowUploadXMLModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [showFileListModal, setShowFileListModal] = useState(false);

  // User profiles
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Handle clicking a username to see their profile
  const handleUserNameClick = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  // Handle uploading XML docs
  const handleToggleUploadXMLModal = () => {
    setShowUploadXMLModal((prevShow) => !prevShow);
  };

  // Fetch uploaded XML files
  const fetchFileList = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SITE_URL + "/api/file-list",
      );
      const data = await response.json();
      setFileList(data.files);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };
  const handleToggleFileListModal = () => {
    setShowFileListModal((prevShow) => !prevShow);
    if (!showFileListModal) {
      fetchFileList();
    }
  };

  // Handle assigning a trainer
  const handleAssignTrainer = (classItem) => {
    setSelectedClass(classItem);
    setShowAssignModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowAssignModal(false);
    setSelectedClass(null);
  };

  // Handled assigned trainers
  const handleTrainerAssigned = (classId, trainerId, trainerName) => {
    setClasses((prevClasses) =>
      prevClasses.map((classItem) =>
        classItem.id === classId
          ? { ...classItem, trainer: trainerId, trainer_name: trainerName }
          : classItem,
      ),
    );
  };
  const handleAssignTrainerSubmit = async (classId, trainerId) => {
    try {
      await assignTrainerToClass(classId, trainerId);

      // Refresh classes data after assigning trainer
      const updatedClasses = await fetchClasses();
      setClasses(updatedClasses);
      setSelectedClass(null);
      setShowAssignModal(false);
    } catch (error) {
      console.error(error);
      alert("Could not assign trainer to class");
    }
  };

  // Handle adding a trainer
  const handleToggleTrainerRegistrationModal = () => {
    setShowTrainerRegistrationModal((prevShow) => !prevShow);
  };

  // Refresh timetable after changes
  const refreshTrainers = async () => {
    try {
      const data = await fetchTrainers();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };
  const refreshClasses = async () => {
    try {
      const data = await fetchClasses();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses()
      .then((data) => setClasses(data))
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });

    fetchTrainers()
      .then((data) => setTrainers(data))
      .catch((error) => {
        console.error("Error fetching trainers:", error);
      });
  }, []);

  useEffect(() => {
    const calendar = generateCalendarData(classes);
    setCalendarData(calendar);
  }, [classes]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>

      {/* MANAGER ADMIN AREA */}
      <section>
        {/* Add new trainer */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
          onClick={handleToggleTrainerRegistrationModal}
        >
          Add New Trainer
        </button>
        {showTrainerRegistrationModal && (
          <TrainerRegistrationModal
            closeModal={handleToggleTrainerRegistrationModal}
            onTrainerRegistered={refreshTrainers}
          />
        )}{" "}
        {/* XML upload */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleToggleUploadXMLModal}
        >
          Upload XML Document
        </button>
        {showUploadXMLModal && (
          <UploadXMLModal
            closeModal={handleToggleUploadXMLModal}
            onFileUploaded={refreshClasses}
          />
        )}{" "}
        {/* XML file viewer */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleToggleFileListModal}
        >
          View Uploaded Files
        </button>
        {showFileListModal && (
          <FileListModal
            fileList={fileList}
            onClose={handleToggleFileListModal}
          />
        )}
      </section>

      <h2 className="text-xl font-semibold mb-2">Class Timetable</h2>
      <Timetable
        userType="manager"
        calendarData={calendarData}
        onButtonClick={handleAssignTrainer}
        handleUserNameClick={handleUserNameClick}
      />

      {showAssignModal && (
        <AssignTrainerModal
          trainers={trainers}
          classId={selectedClass?.id}
          onAssignTrainer={handleAssignTrainerSubmit}
          closeModal={handleCloseModal}
          updateAssignedTrainer={handleTrainerAssigned}
        />
      )}
      {isUserModalOpen && selectedUser && (
        <UserProfileModal
          chosenUser={selectedUser}
          closeModal={() => setIsUserModalOpen(false)}
        />
      )}
    </>
  );
};

export default ManagerDashboard;
