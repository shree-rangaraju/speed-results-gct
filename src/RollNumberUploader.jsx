import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

import "./RollNumberUploader.css";

const RollNumberUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("rollNumbers", file);

    try {
      const response = await axios.post(
        "https://speed-results-gct-backend.onrender.com/upload",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "results.zip");
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);

      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  return (
    <div className="roll-uploader">
      <img src="src\assets\icons8-result-64.png" alt="some image" />
      <h1>Speed Results GCT</h1>
      <p>
        Unofficial web app to download multiple semester results in one click
      </p>
      <p>
        Upon uploading a .txt file with roll numbers listed on separate lines,
        you can download a zip file containing all the results.
      </p>
      <h3>Upload Roll Numbers</h3>
      <Dropzone
        onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
        accept={{ "text/html": [".txt"] }}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill=""
              viewBox="0 0 24 24"
              width="64"
              height="64"
            >
              <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill="rgba(75, 85, 99, 1)"
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>{" "}
              </g>
            </svg>
            {!file && (
              <p>Drag and drop a text file here, or click to select a file</p>
            )}
            {file && <p>Selected file: {file.name}</p>}
          </div>
        )}
      </Dropzone>
      {file && !loading && (
        <button onClick={handleFileUpload}>Upload Roll Numbers</button>
      )}
      {loading && <div className="spinner"></div>}
    </div>
  );
};

export default RollNumberUploader;
