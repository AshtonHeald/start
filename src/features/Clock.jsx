import { useState, useEffect } from 'react';
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

const DATE_FORMAT = 'ddd MMM DD';
const TIME_FORMAT = 'hh:mm:ss a';

const Time = () => {
  const [date, setDate] = useState(dayjs().format(DATE_FORMAT));
  const [time, setTime] = useState(dayjs().format(TIME_FORMAT));

  useEffect(() => {
    const updateTime = () => {
      setDate(dayjs().format(DATE_FORMAT));
      setTime(dayjs().format(TIME_FORMAT));
    };
    const interval = setInterval(updateTime, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box sx={{padding: "6px 12px", width: "250px"}}>
      <Typography variant="body1" sx={{ fontWeight: 'bold'}}>{date}</Typography>
      <Typography variant="body1">{time}</Typography>
    </Box>
  );
};

export default Time;