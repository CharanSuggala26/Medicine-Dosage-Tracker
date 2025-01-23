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
      setText(resultToShow);
      setText(resultToShow);
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Upload your prescription here to analyse it.
        </h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-gray-800 mb-6 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {image && (
          <div className="mb-6">
            <img
              src={image}
              alt="Selected"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        <button
          onClick={handleOCR}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
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
            <br />
            <p className="text-xs text-gray-500 italic">
              Please note that results might not be 100% accurate.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
