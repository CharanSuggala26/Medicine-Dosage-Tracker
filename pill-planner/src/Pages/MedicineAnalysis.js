// import React, { useState } from "react";
// import { createWorker } from "tesseract.js";
// import { FileText, Upload, Loader2 } from "lucide-react";

// function MedicineAnalysis() {
//   const [image, setImage] = useState(null);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const performOCR = async () => {
//     if (!image) return;

//     setLoading(true);
//     setText("");

//     try {
//       const worker = await createWorker();
//       await worker.loadLanguage("eng");
//       await worker.initialize("eng");
//       const {
//         data: { text },
//       } = await worker.recognize(image);
//       setText(text);
//       await worker.terminate();
//     } catch (error) {
//       console.error("OCR Error:", error);
//       setText("Error processing image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             <FileText className="inline-block mr-2 mb-1" />
//             Image to Text OCR
//           </h1>
//           <p className="text-gray-600">
//             Upload an image and extract text using Optical Character Recognition
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="mb-6">
//             <label className="block w-full cursor-pointer">
//               <input
//                 type="file"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
//                 <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                 <p className="text-gray-600">Click to upload or drag and drop</p>
//                 <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
//               </div>
//             </label>
//           </div>

//           {image && (
//             <div className="mb-6">
//               <img
//                 src={image}
//                 alt="Uploaded preview"
//                 className="max-h-96 mx-auto rounded-lg shadow-md"
//               />
//               <button
//                 onClick={performOCR}
//                 disabled={loading}
//                 className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2" />
//                     Processing...
//                   </>
//                 ) : (
//                   "Extract Text"
//                 )}
//               </button>
//             </div>
//           )}

//           {text && (
//             <div className="border rounded-lg p-4 bg-gray-50">
//               <h2 className="text-lg font-semibold mb-2">Extracted Text:</h2>
//               <p className="whitespace-pre-wrap text-gray-700">{text}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MedicineAnalysis;
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOCR = () => {
    if (!image) return;

    setLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">OCR with React & Tesseract.js</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-gray-800 mb-6 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {image && (
          <div className="mb-6">
            <img src={image} alt="Selected" className="w-full h-auto rounded-lg shadow-md" />
          </div>
        )}
        <button
          onClick={handleOCR}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Extract Text'}
        </button>
        {text && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-2">Extracted Text:</h2>
            <p className="whitespace-pre-wrap break-words text-gray-800">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
