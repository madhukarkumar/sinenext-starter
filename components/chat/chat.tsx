"use client";

import { eleganceClient } from "@/services/eleganceClient";
import { useState } from "react";

export function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ id: number; content: string }[]>(
    []
  );

  const { execute: searchChatCompletion } =
    eleganceClient.hooks.useSearchChatCompletion();

  const handleValueChange: JSX.IntrinsicElements["input"]["onChange"] = (
    event
  ) => {
    setInputValue(event.target.value);
  };

  const handleSubmit: JSX.IntrinsicElements["form"]["onSubmit"] = async (
    event
  ) => {
    try {
      event.preventDefault();
      setMessages((messages) => [
        ...messages,
        { id: new Date().getTime(), content: inputValue },
      ]);

      const completion = await searchChatCompletion({
        collection: "the_phantom_of_the_opera",
        prompt: inputValue,
        textField: "text",
        embeddingField: "embedding",
        systemRole: "You are an assistant",
        maxContextLength: 5000,
      });

      if (completion?.content) {
        setMessages((message) => [
          ...message,
          { id: new Date().getTime(), content: completion.content! },
        ]);
      }

      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="flex flex-col w-screen ml-10 mr-10 p-2 justify-between">
        <ul className="overflow-y-auto flex-grow ml-10 mr-10">
          {messages.map((message) => (
              <li key={message.id} className="p-2 bg-zinc-100 whitespace-pre-wrap">
                {message.content}
              </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <input
              className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
              value={inputValue}
              placeholder="Enter value"
              onChange={handleValueChange}
          />

        </form>
      </div>
  );
}
