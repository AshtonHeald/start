import Box from "@mui/material/Box";
import Clock from "../features/Clock";
import Weather from "../features/Weather";
import Typography from "@mui/material/Typography";

const Header = ({ name, color, location, unit, showSeconds }) => {
	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour >= 5 && hour < 12) {
			return "Good Morning";
		} else if (hour >= 12 && hour < 18) {
			return "Good Afternoon";
		} else if (hour >= 18 && hour < 22) {
			return "Good Evening";
		} else {
			return "Greetings";
		}
	};

	const greeting = getGreeting();

	return (
		<>
			<Box
				className="glass"
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					height: "60px",
				}}
			>
				<Clock showSeconds={showSeconds} />
				<Typography
					variant={"h4"}
					gutterBottom
					sx={{
						display: "flex",
						justifyContent: "center",
						mb: 0,
						fontWeight: "bold",
						position: "fixed",
						width: "100%",
						"@media (max-width:810px)": {
							fontSize: "1.6rem",
						},
					}}
				>
					{greeting}
					<Box sx={{ color: color }}>&nbsp;{name}</Box>
				</Typography>
				<Weather location={location} unit={unit} />
			</Box>
		</>
	);
};

export default Header;
