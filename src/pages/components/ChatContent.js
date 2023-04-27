import React, { useState, useEffect } from "react";
import { BiMessageDots } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import FormatContent from "../layout/FormatContent";

const ChatContent = () => {
  // State variable to keep track of the text in the textarea
  const [text, setText] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle changes to the text in the textarea
  const handleTextChange = (event) => {
    // Limit the length of the text to 2000 characters
    if (event.target.value.length <= 2000) {
      setText(event.target.value);
    }
  };

  // Function to handle key up events in the textarea
  const handleKeyUp = (event) => {
    // Calculate the divisor based on the screen width
    let divisor = 129;
    if (window.matchMedia("(max-width: 768px)").matches) {
      divisor = 38;
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      divisor = 100;
    }

    // Resize the textarea based on its content
    if (event.target.value.length === 0) {
      event.target.rows = 1;
    } else {
      event.target.rows = Math.ceil(event.target.value.length / divisor);
    }
  };

  // Function to handle click events on the submit button
  const handleClick = async (event) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: text },
    ]);
    sendMessage(text);
    setText("");
  };

  const sendMessage = async (message) => {
    try {
      // Define the data to send in the POST request
      const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      };

      // Define the headers for the POST request
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      };

      // Set the loading state to true
      setIsLoading(true);

      // Send a POST request to the OpenAI API using axios
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        data,
        { headers }
      );

      // Update the chat log with the response from the OpenAI API
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "bot", message: res.data.choices[0].message.content },
      ]);

      // Set the loading state to false
      setIsLoading(false);
    } catch (err) {
      // If an error occurs, set the loading state to false and log the error to the console
      setIsLoading(false);
      console.log("Error:", err);
    }
  };

  return (
    <>
      <div className="lg:mx-40 text-xs lg:text-sm mt-10 mb-24">
        {chatLog.map((message, index) => (
          <div
            key={index}
            className={`flex my-4 ${
              message.type === "user" ? "justify-end " : "justify-start"
            }`}
          >
            <div
              className={`${
                message.type === "user"
                  ? "bg-gradient-to-tr from-cyan-900 to-indigo-900 text-gray-100"
                  : "bg-gray-100 dark:bg-gray-700"
              } rounded-lg p-2 text-gray-800 dark:text-gray-300 max-w-sm mx-4`}
            >
              <FormatContent value={message.message} />
            </div>
          </div>
        ))}
        {isLoading && (
          <div key={chatLog.length} className="flex justify-start">
            <div className="bg-gray-600 rounded-lg p-2 text-gray-200 max-w-sm">
              Typing....
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 w-full bg-white dark:bg-gray-800">
        <form className="lg:mx-40">
          <div className="flex items-end py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <BiMessageDots className="w-6 h-6" />
            </button>
            <textarea
              id="chat"
              rows="1"
              value={text}
              onChange={handleTextChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ask me anything..."
              onKeyUp={handleKeyUp}
            ></textarea>
            <button
              onClick={handleClick}
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <IoMdSend className="w-6 h-6" />
            </button>
          </div>
          <div className="text-right mr-12 my-2 text-sm text-gray-500 dark:text-gray-400">
            {text.length}/2000
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatContent;
