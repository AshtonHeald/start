import useLocation from "../hooks/useLocation";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { X } from "lucide-react";

import TextField from "@mui/material/TextField";


const Settings = ({ open, toggleDrawer, handleDrawerClose, updateName, name }) => {

	const handleNameChange = (event) => {
    updateName(event.target.value); // Update name when input changes
  };

	const [location, getLocation] = useLocation();
	console.log(location);

	const handleLocation = () => {
		getLocation();
		setTimeout(() => {
			window.location.reload();
	}, 1000);
	};

	const DrawerList = (
		<Box
			sx={{ width: 250 }}
			role="presentation"
		>
			<List>
				<ListItem> 
					<TextField id="name" value={name} label="Name" variant="outlined" onChange={handleNameChange} />
				</ListItem>
				<ListItem>
					<button onClick={handleLocation}>Get Location</button>
				</ListItem>
			</List>
			<Divider />
		</Box>
	);

	return (
		<Drawer open={open} onClose={toggleDrawer(false)}>
			<Toolbar style={{ p: "6px" }}>
				<IconButton onClick={handleDrawerClose} sx={{ ml: "auto" }}>
				<X />
				</IconButton>
			</Toolbar>
			<Divider />
			{DrawerList}
		</Drawer>
	);
};

export default Settings;
