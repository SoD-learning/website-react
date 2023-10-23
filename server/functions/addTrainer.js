import db from "../database.js";

export const addTrainer = (name, bio, expertise) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (name, bio, expertise) VALUES (?, ?, ?)`,
      [name, bio, expertise],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name, bio, expertise });
        }
      }
    );
  });
};
