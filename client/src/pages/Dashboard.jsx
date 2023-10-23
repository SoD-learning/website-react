import React, { useEffect, useState } from "react";
import Timetable from "../components/Classes/Timetable";
import ClientDashboard from "../components/Client/ClientDashboard";
import ManagerDashboard from "../components/Manager/ManagerDashboard";
import TrainerDashboard from "../components/Trainer/TrainerDashboard";
import { useAuth } from "../hooks/useAuth";
import generateCalendarData from "../utils/calendarUtils";

const Dashboard = ({
  isModalOpen,
  selectedUser,
  setIsModalOpen,
  setSelectedUser,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleButtonClick = (classItem) => {
    setSelectedUser(classItem);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const userRole = user?.role;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 max-w-7xl">
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-100 mr-2" />
            <span className="text-white">Loading...</span>
          </div>
        ) : (
          <>
            {userRole === "client" && (
              <>
                <ClientDashboard
                  user={user}
                  selectedUser={selectedUser}
                  isModalOpen={isModalOpen}
                  setSelectedUser={setSelectedUser}
                  setIsModalOpen={setIsModalOpen}
                />
                <Timetable
                  calendarData={generateCalendarData}
                  userType="client"
                  onButtonClick={handleButtonClick}
                  selectedUser={user}
                  isModalOpen={isModalOpen}
                  setSelectedUser={setSelectedUser}
                  setIsModalOpen={setIsModalOpen}
                />
              </>
            )}

            {userRole === "trainer" && (
              <>
                <TrainerDashboard
                  user={user}
                  selectedUser={selectedUser}
                  isModalOpen={isModalOpen}
                  setSelectedUser={setSelectedUser}
                  setIsModalOpen={setIsModalOpen}
                />
                <Timetable
                  calendarData={generateCalendarData}
                  userType="trainer"
                  onButtonClick={handleButtonClick}
                  selectedUser={user}
                  isModalOpen={isModalOpen}
                  setSelectedUser={setSelectedUser}
                  setIsModalOpen={setIsModalOpen}
                />
              </>
            )}

            {userRole === "manager" && (
              <>
                <ManagerDashboard
                  user={user}
                  selectedUser={selectedUser}
                  isModalOpen={isModalOpen}
                  setSelectedUser={setSelectedUser}
                  setIsModalOpen={setIsModalOpen}
                />
                <Timetable
                  calendarData={generateCalendarData}
                  userType="manager"
                  onButtonClick={handleButtonClick}
                  selectedUser={user}
                  isModalOpen={isModalOpen}
                  setSelectedUser={setSelectedUser}
                  setIsModalOpen={setIsModalOpen}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
