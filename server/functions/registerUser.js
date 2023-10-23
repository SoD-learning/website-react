import db from "../database.js";

export const registerUser = (email, password, role, name, bio) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (email, password, role, name, bio) VALUES (?, ?, ?, ?, ?)`,
      [email, password, role, name, bio],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, email, password, role, name, bio });
        }
      }
    );
  });
};
