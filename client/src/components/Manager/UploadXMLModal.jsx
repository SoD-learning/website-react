import React, { useState } from "react";

// Accept the onFileUploaded prop so we can refresh the Timetable
// after the upload
const UploadXMLModal = ({ closeModal, onFileUploaded }) => {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        import.meta.env.VITE_SITE_URL + "/api/upload-xml",
        {
          method: "POST",
          body: formData
        }
      );

      if (response.ok) {
        alert("File uploaded successfully!");
        // This will trigger the Timetable component to update
        onFileUploaded();
      } else {
        alert("Error uploading file.");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading file.");
    }
    closeModal();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Upload XML
            </h3>
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="upload-xml"
                    className="block text-gray-700 font-bold mb-2">
                    Choose XML file:
                  </label>
                  <input
                    type="file"
                    accept=".xml"
                    id="upload-xml"
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadXMLModal;
