import { useEffect, useState } from 'react';

export default function useTimer(seconds) {
  const [count, setCount] = useState(seconds);

  if (count === 0) {
    //setCompleted(true);
    return true;
  }

  setTimeout(() => {
    if (count > 0) {
      setCount(count - 1);
    }
  }, 1000);
}
