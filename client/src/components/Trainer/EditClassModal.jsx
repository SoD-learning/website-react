import React, { useEffect, useState } from "react";
import { fetchRooms } from "../../api/api";

const EditClassModal = ({ classData, onClose, onUpdate }) => {
  const [title, setTitle] = useState(classData.title);
  const [description, setDescription] = useState(classData.description);
  const [date, setDate] = useState(classData.date);
  const [start_time, setStartTime] = useState(classData.start_time);
  const [end_time, setEndTime] = useState(classData.end_time);
  const [room, setRoom] = useState(classData.room);
  const [rooms, setRooms] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedClassData = {
      ...classData,
      title: title,
      description: description,
      date: date,
      start_time: start_time,
      end_time: end_time,
      room: room
    };

    const classId = classData.id;

    fetch(import.meta.env.VITE_SITE_URL + `/api/classes/${classId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedClassData)
    })
      .then((response) => {
        if (response.ok) {
          onUpdate(updatedClassData);
          onClose();
        } else {
          throw new Error("Could not update class");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Could not update class");
      });
  };

  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRoomList();
  }, []);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Edit Class
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700 mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700 mb-1">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700 mb-1">
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="start_time"
                  className="text-sm font-medium text-gray-700 mb-1">
                  Start time:
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={start_time}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="end_time"
                  className="text-sm font-medium text-gray-700 mb-1">
                  End time:
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={end_time}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="room"
                  className="text-sm font-medium text-gray-700 mb-1">
                  Room:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}>
                  <option value="">Select a room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.room_number}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Update
                </button>
                <button
                  type="button"
                  className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClassModal;
