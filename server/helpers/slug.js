// Generate slug from blog title
// export default function slugify(title) {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+/, "")
//     .replace(/-+$/, "");
// }

export default function slugify(title) {
  try {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  } catch (error) {
    console.error(error);
    throw new Error("Error slugifying title");
  }
}
