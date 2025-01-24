import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function WorkoutTrainer() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef(null);

  const apiKey = process.env.GEMINI_KEY; // Ensure this is defined in your environment

  useEffect(() => {
    if (!apiKey) {
      console.error('Gemini API key is missing. Please set it in your environment variables.');
    }
  }, [apiKey]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userInput.trim()) {
      return;
    }

    const updatedMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = updatedMessages
        .map((message) => `${message.role}: ${message.content}`)
        .join('\n') + '\nAssistant:';

      const result = await model.generateMessage({ prompt });
      const assistantResponse = result.response.text;

      setMessages([...updatedMessages, { role: 'assistant', content: assistantResponse }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: 'Error: Could not generate response.' },
      ]);
    }

    inputRef.current.focus();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Workout Gym Trainer</h1>

      <div className="flex flex-col space-y-4">
        <div className="flex">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask your workout questions here..."
            ref={inputRef}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleSubmit}
        >
          Ask
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Conversation History</h2>
        <ul className="list-none">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`p-2 rounded-md ${
                message.role === 'user'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <strong>{message.role}:</strong> {message.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkoutTrainer;
