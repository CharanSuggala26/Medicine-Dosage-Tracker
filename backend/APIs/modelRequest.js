const expAsyncHandler = require("express-async-handler");
const exp = require("express");
const verifyToken = require("../Middleware/authenticate");
require("dotenv").config();
const modelApp = exp.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const fetchInfo = expAsyncHandler(async (req, res) => {
  const textInput = req.body.text;
  const api_key = process.env.GEMINI_KEY;

  const genAI = new GoogleGenerativeAI(api_key);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(
    `You are an experienced MBBS doctor and you are expert in giving Medications and analzing prescriptions.I am giving you the data extract from a medical prescription. I want you to analyze the text and include the following things: the list of medicines given the in the prescription with dosage, along with when and how to take each medicine and any required precautions(Dos and Donts). Directly respond with the answer, no other text. Make it plain text without any bold or italics, format it so that it can directly be displayed on a webpage.If the information extracted is not complete then use your knowlege to give the response with the limited information you got from the input. The prescription text is: ${textInput}`
  );

  const responseText = result.response.text();

  return res.send({ status: 200, payload: responseText });
});

const fetchChat = expAsyncHandler(async (req, res) => {
  const textInput = req.body.userInput;
  const api_key = process.env.GEMINI_KEY;

  const genAI = new GoogleGenerativeAI(api_key);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(
    `You are a conversational chatbot. Answer my question as if you are a certified gym trainer and a health expert. Directly respond with the answer, no other text. Make it plain text without any bold or italics, format it so that it can directly be displayed on a webpage with a maximum of 10 sentences and keep it short if there is not much scope. Be professional and don't be unnecessarily verbose. My question is: ${textInput}`
  );

  const responseText = result.response.text();

  return res.send({ status: 200, payload: responseText });
});

modelApp.post("/prescription", verifyToken, fetchInfo);
modelApp.post("/chat", verifyToken, fetchChat);

module.exports = modelApp;
