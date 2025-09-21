import { useState, useEffect } from "react";

const messages = [
  "Establishing server connection...",
  "Connecting to database...",
  "Loading orders...",
  "Almost ready..."
]

export const Loading = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length); // switch msg
        setFade(true); // fade in
      }, 700); // match duration below
    }, 5000); // change every 2.5s

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="w-full h-[80%] flex items-center justify-center flex-col gap-4 text-sky-600/50 text-xl">
      <span className="loader"></span>
      <span
        className={`transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {messages[index]}
      </span>
    </div>
  );
};