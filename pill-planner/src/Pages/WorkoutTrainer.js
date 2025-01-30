import React, { useState, useRef } from "react";
import axios from "axios";
import { Send, User, Bot } from "lucide-react";

const WorkoutTrainer = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    const updatedMessages = [...messages, { role: "user", content: userInput }];
    setMessages(updatedMessages);
    setUserInput("");

    try {
      const { data } = await axios.post(
        "http://localhost:4700/model/chat",
        { userInput },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      
      setMessages([...updatedMessages, { role: "assistant", content: data.payload }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "I apologize, but I'm unable to process your request at the moment. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }

    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-4xl rounded-lg bg-blue-500 shadow-lg">
        {/* Header */}
        <div className="border-b p-4">
          <h1 className="text-2xl font-bold align text-white p-4">Personal Workout Assistant</h1>
        </div>

        {/* Messages Container */}
        <div className="h-[60vh] overflow-y-auto bg-gray-200 p-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              <p>Start a conversation with your workout assistant</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] items-start space-x-2 rounded-lg p-3 ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-t bg-white p-4">
          <div className="flex space-x-2">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              placeholder="Ask about workouts, exercises, or fitness advice..."
              className="flex-1 resize-none rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutTrainer;
