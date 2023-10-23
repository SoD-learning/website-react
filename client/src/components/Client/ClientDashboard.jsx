import React, { useEffect, useState } from "react";
import {
  cancelClassSignUp,
  fetchClasses,
  fetchSignedUpClasses,
  fetchTrainers,
  signUpForClass,
} from "../../api/api";

import generateCalendarData from "../../utils/calendarUtils";
import Timetable from "../Classes/Timetable";
import UserProfileModal from "../Users/UserProfileModal";

const ClientDashboard = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [calendarData, setCalendarData] = useState([]);

  // Handle the state of the buttons so they reflect
  // the classes the user has signed up to
  const [signedUpClasses, setSignedUpClasses] = useState([]);

  // Initialize the signUpStatuses state with the signedUpClasses
  const [signUpStatuses, setSignUpStatuses] = useState({});

  // User profiles
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle clicking a username to see their profile
  const handleUserNameClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Class signups
  const isSignedUp = (classId) => {
    return signUpStatuses[classId] === true;
  };
  const handleSignUp = async (classId) => {
    try {
      if (isSignedUp(classId)) {
        // Cancel sign-up to class
        await cancelClassSignUp(classId, user.id);
      } else {
        // Sign up for class
        await signUpForClass(classId, user.id);
      }

      // Refresh classes data after signing up or canceling
      const updatedClasses = await fetchClasses();
      setClasses(updatedClasses);
      const updatedSignedUpClasses = await fetchSignedUpClasses(user.id);
      setSignedUpClasses(updatedSignedUpClasses);
    } catch (error) {
      console.error(error);
      alert("Could not sign up for class: " + error.message);
    }
  };

  // fetch stuff
  useEffect(() => {
    fetchClasses()
      .then((data) => setClasses(data))
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });

    fetchSignedUpClasses(user.id)
      .then((data) => setSignedUpClasses(data))
      .catch((error) => {
        console.error("Error fetching signed-up classes:", error);
      });

    fetchTrainers()
      .then((data) => {
        return setTrainers(data);
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
      });
  }, []);

  // Calendar
  useEffect(() => {
    const calendar = generateCalendarData(classes);
    setCalendarData(calendar);
  }, [classes]);

  // Set signed up classes
  useEffect(() => {
    setSignUpStatuses(
      signedUpClasses.reduce((acc, cur) => ({ ...acc, [cur]: true }), {}),
    );
  }, [signedUpClasses]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      <h2 className="text-xl font-semibold mb-2">Class Timetable</h2>
      <Timetable
        userType="client"
        calendarData={calendarData}
        onButtonClick={handleSignUp}
        signUpStatuses={signUpStatuses}
        handleUserNameClick={handleUserNameClick}
      />

      {isModalOpen && selectedUser && (
        <UserProfileModal chosenUser={selectedUser} closeModal={closeModal} />
      )}
    </>
  );
};

export default ClientDashboard;
