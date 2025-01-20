import { useState } from 'react';
import { createWorker } from 'tesseract.js';

function Prescription() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedImage(file);
      setTextResult('');
      setProgress('');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedImage(file);
      setTextResult('');
      setProgress('');
    }
  };

  const handleExtractText = async () => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }

    try {
      setLoading(true);
      setProgress('Initializing OCR...');
      
      const worker = await createWorker();

      setProgress('Loading language data...');
      await worker.loadLanguage('eng');
      
      setProgress('Initializing API...');
      await worker.initialize('eng');
      
      setProgress('Processing image...');
      const { data: { text } } = await worker.recognize(selectedImage);
      
      if (!text.trim()) {
        throw new Error('No text was detected in the image. Please ensure the image contains clear, readable text.');
      }
      
      setTextResult(text);
      setProgress('');
      
      await worker.terminate();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error processing image. Please ensure the image is clear and contains readable text.');
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Image to Text OCR
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Upload an image and extract text using Optical Character Recognition
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <div 
            className={`relative border-2 border-dashed rounded-lg p-12 text-center
              ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
              ${!selectedImage ? 'hover:border-gray-400 transition-colors' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!selectedImage ? (
              <>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/gif"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageInput"
                />
                <label
                  htmlFor="imageInput"
                  className="cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-lg font-medium text-gray-700">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              </>
            ) : (
              <div className="space-y-4">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setTextResult('');
                    setProgress('');
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          {selectedImage && (
            <>
              <button
                onClick={handleExtractText}
                disabled={loading}
                className={`mt-6 w-full py-3 px-4 rounded-md text-white font-medium
                  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                  transition-colors`}
              >
                {loading ? 'Processing...' : 'Extract Text'}
              </button>
              
              {progress && (
                <div className="mt-4 text-sm text-gray-600 text-center">
                  {progress}
                </div>
              )}
            </>
          )}

          {textResult && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Extracted Text:
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap border border-gray-200">
                {textResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prescription;