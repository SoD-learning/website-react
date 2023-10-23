import React, { useState } from "react";
import UserProfileModal from "../Users/UserProfileModal";

const Timetable = ({
  calendarData,
  userType,
  onButtonClick,
  signUpStatuses,
  handleUserNameClick,
  selectedUser,
  isModalOpen,
  closeModal,
}) => {
  return (
    <div className="bg-white text-black">
      {/* Use a responsive grid layout */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {/* Use a flex container for each item */}
        {Array.isArray(calendarData) &&
          calendarData.map((day, index) => (
            <li key={index} className="border p-2">
              {/* Date */}
              <div className="font-semibold text-yellow-600 mb-2">
                {day.date.toLocaleDateString("en-AU", {
                  weekday: "long",
                })}
                <br />(
                {day.date.toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                })}
                )
              </div>

              {/* Class */}
              {day.dayClasses.length > 0 ? (
                day.dayClasses.map((classItem) => (
                  <div key={classItem.id} className="mb-2">
                    {/* Title and time */}
                    <div className="pb-3 flex flex-col items-start">
                      <span className="font-semibold text-base sm:text-lg">
                        {classItem.title}
                      </span>
                      <span className="font-mono text-xs sm:text-sm">
                        {classItem.start_time}
                      </span>
                    </div>
                    {/* Room */}
                    <div className="flex flex-col items-start">
                      <span>Room: {classItem.room_number || "TBA"}</span>
                    </div>
                    {/* Trainer */}
                    <div className="pb-3 flex flex-col items-start">
                      <span
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() =>
                          handleUserNameClick({
                            name: classItem.trainer_name,
                            bio: classItem.bio,
                            expertise: classItem.trainer_expertise,
                          })
                        }
                      >
                        {classItem.trainer_name || "TBA"}
                      </span>
                    </div>
                    {/* Available slots */}
                    <div className="pb-3 flex flex-col items-start">
                      <span>
                        Slots available:{" "}
                        {classItem.room_capacity - classItem.signups_count ||
                          "TBA"}
                      </span>
                    </div>

                    {/* User-specific buttons */}
                    {userType === "client" && (
                      <div className="pb-3">
                        <button
                          onClick={() => onButtonClick(classItem.id)}
                          className={`px-2 py-1 ${
                            signUpStatuses[classItem.id]
                              ? "bg-red-500"
                              : "bg-yellow-400"
                          } text-white rounded`}
                        >
                          {signUpStatuses[classItem.id] ? "Cancel" : "Sign Up"}
                        </button>
                      </div>
                    )}
                    {userType === "trainer" && (
                      <div className="pb-3">
                        <button
                          onClick={() => onButtonClick(classItem)}
                          className="px-2 py-1 bg-yellow-400 text-white rounded"
                        >
                          Edit Class
                        </button>
                      </div>
                    )}
                    {userType === "manager" && (
                      <div className="pb-3">
                        <button
                          onClick={() => onButtonClick(classItem)}
                          className="px-2 py-1 bg-yellow-400 text-white rounded"
                        >
                          Assign Trainer
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="italic">No classes available</div>
              )}
            </li>
          ))}
      </ul>

      {isModalOpen && selectedUser && (
        <UserProfileModal chosenUser={selectedUser} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Timetable;
