import { useEffect, useState } from "react";

export default function useTimer(seconds) {
  const [count, setCount] = useState(seconds);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (count === 0) {
      setCompleted(true);
      return;
    }

    const interval = setInterval(() => {
      setCount((prevCount) => Math.max(prevCount - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  return { count, completed };
}
