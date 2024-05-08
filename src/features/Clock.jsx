import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Time = ({ showSeconds }) => {
	const DATE_FORMAT = "ddd MMM DD";
	const TIME_FORMAT = showSeconds ? "hh:mm:ss a" : "hh:mm a";

	const [date, setDate] = useState(dayjs().format(DATE_FORMAT));
	const [time, setTime] = useState(dayjs().format(TIME_FORMAT));

	useEffect(() => {
		// Function to update time
		const updateTime = () => {
			setDate(dayjs().format(DATE_FORMAT));
			setTime(dayjs().format(TIME_FORMAT));
		};

		// Update time immediately and then every second
		updateTime();
		const interval = setInterval(updateTime, 10);

		// Clear interval on component unmount
		return () => {
			clearInterval(interval);
		};
	}, [showSeconds]);

	return (
		<Box sx={{ padding: "6px 12px" }}>
			<Typography variant="body1" sx={{ fontWeight: "bold" }}>
				{date}
			</Typography>
			<Typography variant="body1">{time}</Typography>
		</Box>
	);
};

export default Time;
