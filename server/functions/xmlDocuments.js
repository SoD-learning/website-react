import db from "../database.js";

export const insertOrUpdateRoomData = (roomData) => {
  db.serialize(() => {
    roomData.forEach((room) => {
      if (room.action === "add") {
        db.run(
          "INSERT OR IGNORE INTO rooms (room_number, capacity) VALUES (?, ?)",
          [room.room_number, room.capacity]
        );
      } else if (room.action === "update") {
        db.run("UPDATE rooms SET capacity = ? WHERE room_number = ?", [
          room.capacity,
          room.room_number
        ]);
      }
    });
  });
};

export const insertOrUpdateClassData = (classData) => {
  db.serialize(() => {
    classData.forEach((classInfo) => {
      if (classInfo.action === "add") {
        db.run(
          "INSERT INTO classes (title, description, date, start_time, end_time, trainer, room, attendees) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            classInfo.title,
            classInfo.description,
            classInfo.date,
            classInfo.start_time,
            classInfo.end_time,
            classInfo.trainer,
            classInfo.room,
            classInfo.attendees
          ]
        );
      } else if (classInfo.action === "update") {
        db.run(
          "UPDATE classes SET description = ?, date = ?, start_time = ?, end_time = ?, trainer = ?, room = ?, attendees = ? WHERE title = ?",
          [
            classInfo.description,
            classInfo.date,
            classInfo.start_time,
            classInfo.end_time,
            classInfo.trainer,
            classInfo.room,
            classInfo.attendees,
            classInfo.title
          ]
        );
      }
    });
  });
};

// export const insertRoomData = (roomData) => {
//   const insertSQL =
//     "INSERT OR IGNORE INTO rooms (room_number, capacity) VALUES (?, ?)";

//   db.serialize(() => {
//     const stmt = db.prepare(insertSQL);

//     for (const room of roomData) {
//       stmt.run(room.room_number, room.capacity);
//     }

//     stmt.finalize();
//   });
// };
