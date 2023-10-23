// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {}
//   }
// };

// module.exports = {
//   sourceType: "module",
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {}
//   }
// };

const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [tailwindcss, autoprefixer]
};
