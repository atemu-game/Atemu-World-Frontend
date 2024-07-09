import React from 'react';
import DateTimeDisplay from './DateTimePlay';
import { HStack } from '@chakra-ui/react';
interface IProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const ShowCounter = ({ days, hours, minutes, seconds }: IProps) => {
  return (
    <HStack
      my={{ md: 6, base: 4 }}
      gap={1}
      flexWrap={{ md: 'nowrap', base: 'wrap' }}
      justifyContent="center"
      fontWeight="bold"
    >
      <DateTimeDisplay value={days} type={'D'} isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={'H'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={'M'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={'S'} isDanger={false} />
    </HStack>
  );
};

export default ShowCounter;
