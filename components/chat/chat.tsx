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
    <div className="flex flex-col gap-4 p-4 border w-full max-w-96">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border"
          value={inputValue}
          placeholder="Enter value"
          onChange={handleValueChange}
        />
        <button type="submit">Submit</button>
      </form>

      <ul className="border-t flex flex-col pt-4 gap-2">
        {messages.map((message) => (
          <li key={message.id} className="p-2 bg-zinc-100">
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
