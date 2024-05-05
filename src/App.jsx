import { useState, useEffect } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Search from "./features/Search";
import SettingsDrawer from "./features/Settings";
import { Settings } from "lucide-react";
import { pink } from "@mui/material/colors";

import useLocation from './hooks/useLocation'; 

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: pink[500],
		},
	},
});

const color = darkTheme.palette.primary.main;

function App() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState(""); // State for name

	useEffect(() => {
		// Load name from local storage on component mount
		const storedName = localStorage.getItem("name");
		if (storedName) {
			setName(storedName);
		}
	}, []);

	// Function to update name
	const updateName = (newName) => {
		setName(newName);
		// Store name in local storage
		localStorage.setItem("name", newName);
	};

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const { location, getCurrentLocation } = useLocation();

	return (
		<Box sx={{ height: "100vh" }}>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Background />
				<Header color={color} name={name} location={location} />
				<SettingsDrawer
					open={open}
					toggleDrawer={toggleDrawer}
					handleDrawerClose={handleDrawerClose}
					updateName={updateName}
					name={name}
					getCurrentLocation={getCurrentLocation}
				/>
				<Search />
				<Box sx={{ position: "fixed", bottom: "0", left: "0" }}>
					<IconButton
						onClick={toggleDrawer(true)}
						sx={{ m: "12px" }}
						className="glass"
					>
						<Settings />
					</IconButton>
				</Box>
                {/* Display location information */}
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
                <p>City: {location.city}</p>
                <p>Country: {location.country}</p>
			</ThemeProvider>
		</Box>
	);
}

export default App;
