import sqlite3 from "sqlite3";

const db = new sqlite3.Database("highstreetgym.db");

// Create the 'users' table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    name TEXT NOT NULL,
    bio TEXT,
    trainer_expertise TEXT
    )`);
});

// Create the 'rooms' table
// UNIQUE(room_number)
//   Ensures each room is only added once
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_number INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    UNIQUE(room_number)
    )`);
});

// Create the 'classes' table
db.run(`CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    trainer INTEGER,
    room INTEGER NOT NULL,
    attendees INTEGER NOT NULL,
    FOREIGN KEY(trainer) REFERENCES users(id),
    FOREIGN KEY(room) REFERENCES rooms(room_number)
    )`);

// Create the 'class_signups' table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS class_signups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL
    )`);
});

// Create the 'blog' table
// slug = constraint that ensures unique URL for each post
db.run(`CREATE TABLE IF NOT EXISTS blog (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  author INTEGER NOT NULL,
  date TEXT NOT NULL,
  FOREIGN KEY(author) REFERENCES users(id)
)`);

export default db;
