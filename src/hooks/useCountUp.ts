import { useState, useEffect, useRef } from 'react';

const useCountUp = (endValue: number, duration: number = 2000, startValue: number = 0): number => {
  const [count, setCount] = useState(startValue);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
   
    setCount(startValue);
    startTime.current = null;

    const animateCount = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp;
      }

      const progress = timestamp - startTime.current;
      const easingProgress = Math.min(1, progress / duration);
      
      const easedProgress = 1 - Math.pow(1 - easingProgress, 3);      
      const nextValue = startValue + (endValue - startValue) * easedProgress;

      setCount(nextValue);
      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(endValue);
      }
    };

    const frameId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(frameId);
  }, [endValue, duration, startValue]);
  return Math.round(count * 100) / 100;
};

export default useCountUp;