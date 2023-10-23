import bcrypt from "bcrypt";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import xml2js from "xml2js";
import db from "./database.js";
import { deleteBlogPost } from "./functions/deleteBlogPost.js";
import { registerUser } from "./functions/registerUser.js";
import { getUserByEmail, getUserById } from "./functions/userQueries.js";
import {
  insertOrUpdateClassData,
  insertOrUpdateRoomData,
} from "./functions/xmlDocuments.js";
import { checkPassword } from "./helpers/password.js";
import slugify from "./helpers/slug.js";

// TODO: Get this file-list thingy to work
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to handle storing uploaded XML documents
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/xml");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(express.json());

// app.use(cors());

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3001"],
  credentials: true,
};

app.use(cors(corsOptions));

// TODO: Make dummy data when needed ================================================
// import {
//   makeDummyBlogPosts,
//   makeDummyClasses,
//   makeDummyRooms,
//   makeDummyUsers,
// } from "./dummyData.js";
// const classes = makeDummyClasses();
// const rooms = makeDummyRooms();
// const users = makeDummyUsers();
// const blogPosts = makeDummyBlogPosts();
// TODO: Make dummy data when needed ================================================

// Serve files in the /uploads directory as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to authorisation
app.get("/api/auth/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await getUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Route to login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  if (!(await checkPassword(password, user.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Sign and generate a JWT
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  // Return the JWT to the client
  res.json({ token });
});

// Route to register a new user
app.post("/api/register", async (req, res) => {
  try {
    const { email, password, role, name, bio } = req.body;

    if (!email || !password || !role || !name) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // saltRounds means brute forcing is computationally expensive
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await registerUser(
      email,
      encryptedPassword,
      role,
      name,
      bio,
    );

    const user = { id: newUser.id, role: newUser.role };

    // Sign and generate a JWT
    const token = jwt.sign(user, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return the JWT to the client
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
});

// Route to get classes data
app.get("/api/classes", (req, res) => {
  // ADDED users.bio as trainer_bio,
  // ADDED users.trainer_expertise as trainer_expertise,
  const sql = `
    SELECT classes.*,
           users.name as trainer_name,
           users.bio as bio,
           users.trainer_expertise as trainer_expertise,
           rooms.room_number as room_number,
           rooms.capacity as room_capacity,
           COUNT(class_signups.user_id) as signups_count
    FROM classes
    LEFT JOIN users ON classes.trainer = users.id
    LEFT JOIN rooms ON classes.room = rooms.id
    LEFT JOIN class_signups ON classes.id = class_signups.class_id
    GROUP BY classes.id
  `;

  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve classes data" });
    } else {
      res.json(rows);
    }
  });
});

// Route to get rooms data
app.get("/api/rooms", (req, res) => {
  db.all("SELECT id, room_number FROM rooms", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Could not fetch rooms");
    } else {
      res.status(200).json(rows);
    }
  });
});

// TODO: NOW updateTrainer endpoint causes "trainer is not defined"
// Route to create a class
app.post("/api/class", (req, res) => {
  const { title, description, date, start_time, end_time, trainer, room } =
    req.body;

  db.run(
    // ADDED trainer ... ?
    "INSERT INTO classes(title, description, date, start_time, end_time, trainer, room, attendees) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    // ADDED trainer
    [title, description, date, start_time, end_time, trainer, room, 0],
    function (err) {
      if (err) {
        console.log(err);
        res.status(500).send("Could not add class");
      } else {
        res
          .status(200)
          .send(`Class added successfully with ID: ${this.lastID}`);
      }
    },
  );
});

// Route to update classes data
app.put("/api/classes/:id", (req, res) => {
  const classId = req.params.id;
  const {
    title,
    description,
    date,
    start_time,
    end_time,
    trainer,
    room,
    attendees,
  } = req.body;

  db.run(
    "UPDATE classes SET title = ?, description = ?, date = ?, start_time = ?, end_time = ?, trainer = ?, room = ?, attendees = ? WHERE id = ?",
    [
      title,
      description,
      date,
      start_time,
      end_time,
      trainer,
      room,
      attendees,
      classId,
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Could not update class");
      } else {
        res.status(200).send("Class updated successfully");
      }
    },
  );
});

// TODO: FIX ME 'cause I'm ugly
// Route to sign up user for a class
app.post("/api/classes/:id/signup", (req, res) => {
  const classId = req.params.id;
  const userId = req.body.user_id;

  // Check for existing signups
  db.get(
    `SELECT * FROM class_signups WHERE user_id = ? AND class_id = ?`,
    [userId, classId],
    (err, row) => {
      if (err) {
        res.status(500).send({ error: "Database error" });
        return;
      }

      if (row) {
        res.status(409).send({ error: "Already signed up for this class" });
      } else {
        // Check for concurrent classes and prevent double signups here
        db.get(
          `SELECT classes.* FROM class_signups
          JOIN classes ON classes.id = class_signups.class_id
          WHERE class_signups.user_id = ? AND (
            (classes.start_time >= (SELECT start_time FROM classes WHERE id = ?) AND classes.start_time < (SELECT end_time FROM classes WHERE id = ?))
            OR (classes.end_time > (SELECT start_time FROM classes WHERE id = ?) AND classes.end_time <= (SELECT end_time FROM classes WHERE id = ?))
            OR (classes.start_time <= (SELECT start_time FROM classes WHERE id = ?) AND classes.end_time >= (SELECT end_time FROM classes WHERE id = ?))
          )`,
          [userId, classId, classId, classId, classId, classId, classId],
          (err, row) => {
            if (err) {
              res.status(500).send({ error: "Database error" });
              return;
            }

            if (row) {
              res
                .status(409)
                .send({ error: "Already signed up for a class at this time" });
            } else {
              // Insert the new signup if everything is fine
              db.run(
                "INSERT INTO class_signups (user_id, class_id) VALUES (?, ?)",
                [userId, classId],
                (err) => {
                  if (err) {
                    console.error(err);
                    res
                      .status(500)
                      .send(
                        `Could not sign up user for class. Error: ${err.message}`,
                      );
                  } else {
                    res
                      .status(200)
                      .send("User signed up for class successfully");
                  }
                },
              );
            }
          },
        );
      }
    },
  );
});

// Route to get signed-up classes for a user
app.get("/api/user/:id/signed-up-classes", async (req, res) => {
  const userId = req.params.id;

  db.all(
    `SELECT class_id FROM class_signups WHERE user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Failed to retrieve signed-up classes for user" });
      } else {
        res.json(rows);
      }
    },
  );
});

// Route for user to cancel their class booking/signup
app.post("/api/classes/:id/cancel", (req, res) => {
  const classId = req.params.id;
  const userId = req.body.user_id;

  db.run(
    "DELETE FROM class_signups WHERE user_id = ? AND class_id = ?",
    [userId, classId],
    (err) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(`Could not cancel sign-up for class. Error: ${err.message}`);
      } else {
        res.status(200).send("Class sign-up canceled successfully");
      }
    },
  );
});

// Route to get trainers data
app.get("/api/trainers", (req, res) => {
  db.all("SELECT * FROM users WHERE role =?", ["trainer"], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve trainers data" });
    } else {
      res.json(rows);
    }
  });
});

// Route to update a trainer's profile
app.patch("/api/trainer/:id", async (req, res) => {
  const trainerId = req.params.id;
  const { bio, expertise } = req.body;

  try {
    db.run("UPDATE users SET bio = ?, trainer_expertise = ? WHERE id = ?", [
      bio,
      expertise,
      trainerId,
    ]);

    res.status(200).send("Profile updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating profile");
  }
});

// Route to update trainer for a class
app.put("/api/classes/:id/assign-trainer", (req, res) => {
  const classId = req.params.id;
  const { trainer_id } = req.body;

  db.run(
    "UPDATE classes SET trainer = ? WHERE id = ?",
    [trainer_id, classId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Could not update class trainer");
      } else {
        res.status(200).send("Class trainer updated successfully");
      }
    },
  );
});

// Route to get specific blog post with author id and name
app.get("/api/blogposts/:id", (req, res) => {
  const postId = req.params.id;
  db.get(
    "SELECT b.*, u.id AS author_id, u.name AS author_name FROM blog AS b JOIN users AS u ON b.author = u.id WHERE b.id = ?",
    [postId],
    (err, row) => {
      if (err) {
        res.status(500).send("Could not retrieve the blog post");
      } else {
        if (row) {
          res.status(200).json(row);
        } else {
          res.status(404).send("Blog post not found");
        }
      }
    },
  );
});

// Route to delete specific blog post by id
app.delete("/api/blogposts/:id", (req, res) => {
  const postId = req.params.id;

  deleteBlogPost(postId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Route to get all blog posts
app.get(["/api/blogposts", "/api/blog"], (req, res) => {
  db.all("SELECT * FROM blog", [], (err, rows) => {
    if (err) {
      res.status(500).send("Could not retrieve blog posts");
    } else {
      res.status(200).json(rows);
    }
  });
});

// Route to create a new blog post
app.post("/api/blogposts", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const result = db.run(
      "INSERT INTO blog (title, slug, content, author, date) VALUES (?, ?, ?, ?, ?)",
      [title, slugify(title), content, author, new Date().toISOString()],
    );

    res.status(201).json({ id: result.lastID, title, content, author });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating a new blog post");
  }
});

// Route to update a specific blog post
app.put(["/api/blogpost/:id", "/api/blog/:id"], async (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  try {
    db.run("UPDATE blog SET title = ?, content = ? WHERE id = ?", [
      title,
      content,
      blogId,
    ]);

    res.status(200).send("Blog post updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating blog post");
  }
});

// Route for managers to upload XML documents
app.post("/api/upload-xml", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file received");
  }

  const parser = new xml2js.Parser();
  const filePath = `./uploads/xml/${req.file.originalname}`;

  try {
    const fileContent = await fs.promises.readFile(filePath, "utf8");
    const parsedXml = await parser.parseStringPromise(fileContent);

    if (parsedXml.rooms) {
      const roomData = parsedXml.rooms.room.map((room) => ({
        action: room.$.action,
        room_number: parseInt(room.room_number[0]),
        capacity: parseInt(room.capacity[0]),
      }));

      insertOrUpdateRoomData(roomData);
    } else if (parsedXml.classes) {
      const classData = parsedXml.classes.class.map((classInfo) => ({
        action: classInfo.$.action,
        title: classInfo.title[0],
        description: classInfo.description[0],
        date: classInfo.date[0],
        start_time: classInfo.start_time[0],
        end_time: classInfo.end_time[0],
        trainer: parseInt(classInfo.trainer[0]),
        room: parseInt(classInfo.room[0]),
        attendees: parseInt(classInfo.attendees[0]),
      }));

      insertOrUpdateClassData(classData);
    } else {
      res.status(400).send("Invalid XML document.");
    }

    res
      .status(200)
      .send(
        "File uploaded, parsed, and data inserted or updated in the database successfully!",
      );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while processing the file.");
  }
});

// Route to the file list for uploaded XML documents
app.get("/api/file-list", async (req, res) => {
  try {
    const fileNames = await fs.promises.readdir("./uploads/xml");
    res.status(200).json({ files: fileNames });
  } catch (error) {
    console.error("Error fetching file list:", error);
    res.status(500).send("Error fetching file list");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
