const sanitizeInput = (input) => {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
};

export default sanitizeInput;
