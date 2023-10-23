import db from "../database.js";

export const deleteBlogPost = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM blog WHERE id = ?`, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Blog post deleted successfully", id });
      }
    });
  });
};
