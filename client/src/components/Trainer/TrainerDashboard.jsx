import React, { useEffect, useState } from "react";
import { fetchClasses, fetchTrainers } from "../../api/api";
import generateCalendarData from "../../utils/calendarUtils";
import Timetable from "../Classes/Timetable";
import UserProfileModal from "../Users/UserProfileModal";
import CreateClass from "./CreateClass";
import EditClassModal from "./EditClassModal";

const TrainerDashboard = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  // User profiles
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Handle editing classes
  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setShowEditModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedClass(null);
  };

  // Handle clicking a username to see their profile
  const handleUserNameClick = (username) => {
    // TODO: After profile is updated, clicking user again doesn't show updated db data
    setSelectedUser(username);
    setIsUserModalOpen(true);
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

  // Handle class updates
  // TODO: doubled up with handleEditClass????
  const handleUpdateClass = async (updatedClass) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SITE_URL + `/api/classes/${updatedClass.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedClass),
        },
      );
      if (!response.ok) {
        throw new Error("handleUpdateClass: Could not update class");
      }

      // TODO: get this working
      // Refresh classes data after updating
      const updatedClasses = await fetchClasses();
      setClasses(updatedClasses);
      setSelectedClass(null);
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      alert("Could not update class");
    }
  };

  // Refresh timetable after changes
  const refreshClasses = async () => {
    try {
      const data = await fetchClasses();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    const calendar = generateCalendarData(classes);
    setCalendarData(calendar);
  }, [classes]);

  const isModalOpen = showEditModal && selectedClass;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      <h2 className="text-xl font-semibold mb-2">Class Timetable</h2>
      <Timetable
        userType="trainer"
        calendarData={calendarData}
        onButtonClick={handleEditClass}
        handleUserNameClick={handleUserNameClick}
      />

      {/* TRAINER ADMIN AREA */}
      <section className="py-10">
        <h2 className="text-xl font-semibold mb-2">Admin</h2>
        <div className="w-full max-w-xl md:max-w-md lg:max-w-lg">
          <CreateClass onClassCreated={refreshClasses} user={user} />
        </div>
      </section>

      {isModalOpen && (
        <EditClassModal
          classData={selectedClass}
          onClose={handleCloseModal}
          onUpdate={handleUpdateClass}
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

export default TrainerDashboard;
