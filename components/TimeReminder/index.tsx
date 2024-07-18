import { useCountdown } from '@/hooks/useCountDown';
import React from 'react';
import ShowCounter from './ShowCounter';
import ExpiredNotice from './ExpiredNotice';
interface IProps {
  targetDate: number;
}
const TimeReminder = ({ targetDate }: IProps) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
export default TimeReminder;
