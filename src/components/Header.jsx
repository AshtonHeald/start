import Box from "@mui/material/Box";
import Clock from "../features/Clock";
import Weather from "../features/Weather";
import Typography from "@mui/material/Typography";

const Header = ({name, color, location}) => {
	
	return (
		<>
			<Box className="glass"
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					height: "60px"
				}}
			>
        <Clock />
				<Typography
					variant="h4"
					gutterBottom
					sx={{ display: "flex", justifyContent: "center", mb: 0, fontWeight: "bold" }}
				>
					Good Morning 
					<Box sx={{ color: color }}>
						&nbsp;{name}
					</Box>
				</Typography>
				<Weather location={location}/>
			</Box>
		</>
	);
};

export default Header;
