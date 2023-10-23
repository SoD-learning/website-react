import React from "react";

const FileListModal = ({ fileList, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg overflow-y-auto max-h-80 w-96">
        <div className="flex justify-between px-4 py-2 border-b-2 border-gray-200">
          <h2 className="text-lg font-medium">Uploaded Files</h2>
          <button className="text-gray-500" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="p-4">
          {fileList.length === 0 ? (
            <p>No files uploaded yet.</p>
          ) : (
            <ul className="space-y-2">
              {fileList.map((fileName) => (
                <li key={fileName}>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => window.open(`/uploads/xml/${fileName}`)}
                  >
                    {fileName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileListModal;
