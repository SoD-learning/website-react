// TODO: DELETE ME

import bcrypt from "bcrypt";
import db from "./database.js";

// Classes
export function makeDummyClasses() {
  const dummyClasses = [
    {
      title: "Yoga",
      description: "Relaxing yoga class",
      date: "2023-05-10",
      start_time: "09:00:00",
      end_time: "10:00:00",
      trainer: 1,
      room: 1,
      attendees: 0,
    },
    {
      title: "Pilates",
      description: "Strengthen your core with pilates.",
      date: "2023-05-11",
      start_time: "14:00:00",
      end_time: "15:00:00",
      trainer: 2,
      room: 2,
      attendees: 0,
    },
    {
      title: "Zumba",
      description: "Get moving with a fun Zumba class!",
      date: "2023-05-12",
      start_time: "17:00:00",
      end_time: "18:00:00",
      trainer: 3,
      room: 3,
      attendees: 0,
    },
    {
      title: "Spinning",
      description: "A high-energy cycling class.",
      date: "2023-05-12",
      start_time: "12:00:00",
      end_time: "13:00:00",
      trainer: 4,
      room: 4,
      attendees: 0,
    },
    {
      title: "Strength Training",
      description: "Build strength and tone your muscles.",
      date: "2023-05-14",
      start_time: "16:00:00",
      end_time: "17:00:00",
      trainer: 5,
      room: 5,
      attendees: 0,
    },
  ];

  db.serialize(() => {
    dummyClasses.forEach((gymClass) => {
      db.run(
        "INSERT INTO classes (title, description, date, start_time, end_time, trainer, room, attendees) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          gymClass.title,
          gymClass.description,
          gymClass.date,
          gymClass.start_time,
          gymClass.end_time,
          gymClass.trainer,
          gymClass.room,
          gymClass.attendees,
        ],
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Inserted ${gymClass.title} class into database.`);
          }
        },
      );
    });
  });

  return dummyClasses;
}

// Users
export function makeDummyUsers() {
  // make brute force attacks more computationally expensive
  const saltRounds = 10;
  const dummyUsers = [
    {
      email: "client@example.com",
      password: "client123",
      role: "client",
      name: "Client Clienterson",
    },
    {
      email: "client1@example.com",
      password: "client123",
      role: "client",
      name: "Client Getfiterson",
    },
    {
      email: "trainer@example.com",
      password: "trainer123",
      role: "trainer",
      name: "Trainer Trainerson",
    },
    {
      email: "trainer1@example.com",
      password: "trainer123",
      role: "trainer",
      name: "Trainer McTrainerface",
    },
    {
      email: "trainer2@example.com",
      password: "trainer123",
      role: "trainer",
      name: "Trainer Zumbalicious",
    },
    {
      email: "trainer3@example.com",
      password: "trainer123",
      role: "trainer",
      name: "Trainer Spinmaster",
    },
    {
      email: "trainer4@example.com",
      password: "trainer123",
      role: "trainer",
      name: "Trainer Strongman",
    },
    {
      email: "manager@example.com",
      password: "manager123",
      role: "manager",
      name: "Manager Managererson",
    },
    {
      email: "manager1@example.com",
      password: "manager123",
      role: "manager",
      name: "Manager Bigkahuna",
    },
  ];

  db.serialize(() => {
    dummyUsers.forEach((user) => {
      bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) throw err;
        db.run(
          "INSERT OR IGNORE INTO users (email, password, role, name) VALUES (?, ?, ?, ?)",
          [user.email, hash, user.role, user.name],
          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(`Inserted user: ${user.name} into database.`);
            }
          },
        );
      });
    });
  });

  return dummyUsers;
}

// Rooms
export function makeDummyRooms() {
  const dummyRooms = [
    {
      room_number: 101,
      capacity: 50,
    },
    {
      room_number: 102,
      capacity: 40,
    },
    {
      room_number: 103,
      capacity: 30,
    },
    {
      room_number: 104,
      capacity: 20,
    },
    {
      room_number: 105,
      capacity: 10,
    },
  ];

  db.serialize(() => {
    dummyRooms.forEach((room) => {
      db.run(
        "INSERT OR IGNORE INTO rooms (room_number, capacity) VALUES (?, ?)",
        [room.room_number, room.capacity],
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Inserted room ${room.room_number} into database.`);
          }
        },
      );
    });
  });

  return dummyRooms;
}

// Blog Posts
export function makeDummyBlogPosts() {
  const dummyBlogPosts = [
    {
      title: "The Benefits of Yoga",
      slug: "the-benefits-of-yoga",
      content:
        "Yoga is a great way to improve flexibility, strength, and overall well-being. Regular yoga practice can also help reduce stress and improve sleep quality.",
      author: 1,
      date: "2023-04-23",
    },
    {
      title: "The Power of Pilates",
      slug: "the-power-of-pilates",
      content:
        "Pilates is a low-impact workout that focuses on building core strength and stability. Regular Pilates practice can help improve posture and reduce the risk of injury.",
      author: 2,
      date: "2023-04-24",
    },
    {
      title: "Why Zumba is the Ultimate Dance Party",
      slug: "why-zumba-is-the-ultimate-dance-party",
      content:
        "Zumba is a fun and high-energy workout that combines dance and aerobic exercise. Regular Zumba practice can help improve cardiovascular health and boost your mood.",
      author: 3,
      date: "2023-04-25",
    },
  ];

  db.serialize(() => {
    dummyBlogPosts.forEach((post) => {
      db.run(
        "INSERT INTO blog (title, slug, content, author, date) VALUES (?, ?, ?, ?, ?)",
        [post.title, post.slug, post.content, post.author, post.date],
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Inserted blog post: ${post.title} into database.`);
          }
        },
      );
    });
  });

  return dummyBlogPosts;
}
