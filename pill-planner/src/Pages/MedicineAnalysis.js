

import React, { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOCR = () => {
    if (!image) return;

    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    }).then(async ({ data: { text } }) => {
      let result = await axios.post(
        "http://localhost:4700/model/",
        { text },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      const resultToShow = result.data.payload;

      setText(resultToShow);
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Prescription Analysis
        </h1>
        <p className="text-center text-gray-600 mb-6">
        Upload your prescription here to analyse it.
        </p>

        <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          >
            Click to upload or drag and drop
          </label>
          <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
        </div>

        {image && (
          <div className="mb-6">
            <img
              src={image}
              alt="Selected"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        )}

        <button
          onClick={handleOCR}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Processing..." : "Analyse prescription"}
        </button>

        {text && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-2">Result:</h2>
            <p className="whitespace-pre-wrap break-words text-gray-800">
              {text}
            </p>
            <p className="text-xs text-gray-500 italic mt-2">
              Please note that results might not be 100% accurate.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

