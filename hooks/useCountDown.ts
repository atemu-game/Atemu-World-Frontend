import { useEffect, useState } from 'react';

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const useCountdown = (targetDate?: number) => {
  const countDownDate = targetDate ? new Date(targetDate).getTime() : null;
  // console.log('countDownDate', countDownDate);
  const [countDown, setCountDown] = useState(
    countDownDate ? countDownDate - new Date().getTime() : 0
  );

  useEffect(() => {
    if (!countDownDate) return;

    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);
  const data = getReturnValues(countDown);

  return data;
};

export { useCountdown };
