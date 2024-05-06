import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { X, MapPin, RotateCcw, Clock  } from "lucide-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ButtonGroup from "@mui/material/ButtonGroup";
import Switch from "@mui/material/Switch";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

const Settings = ({
	open,
	toggleDrawer,
	handleDrawerClose,
	updateName,
	name,
	getCurrentLocation,
	resetLocation,
	unit,
	handleUnitChange,
	handleSecondsToggle,
	showSeconds,
}) => {
	const handleNameChange = (event) => {
		updateName(event.target.value); // Update name when input changes
	};

	const DrawerList = (
		<Box sx={{ width: 250 }} role="presentation">
			<List>
			<ListItem>
					<Paper elevation={3}  sx={{ flexDirection: "row", display: "flex", alignItems: "center", width: "100%", borderRadius: "4px" }}>
        <ListItemIcon sx={{ minWidth: "40px", height: "40px", display: "grid", placeItems: "center" }}>
				<Clock />
        </ListItemIcon>
				<ListItemText id="" primary="Show Seconds" />
				<Switch
				sx={{mr: "0px"}}
          edge="end"
					onChange={handleSecondsToggle}
          checked={showSeconds}
          inputProps={{
						'aria-labelledby': '',
          }}
					/>
					</Paper>
      </ListItem>
				<ListItem>
					<TextField
						id="name"
						value={name}
						label="Name"
						variant="outlined"
						onChange={handleNameChange}
					/>
				</ListItem>
				<ListItem>
					<FormControl fullWidth>
						<InputLabel id="unit-label">Unit</InputLabel>
						<Select
							labelId="unit-label"
							id="unit"
							value={unit}
							label="Unit"
							onChange={handleUnitChange}
						>
							<MenuItem value="imperial">Fahrenheit</MenuItem>
							<MenuItem value="metric">Celsius</MenuItem>
							<MenuItem value="standard">Kelvin</MenuItem>
						</Select>
					</FormControl>
				</ListItem>
				<ListItem>
					<ButtonGroup 
						variant="contained"
						sx={{ width: "100%" }}
					>
						<Button
							onClick={getCurrentLocation}
							variant="contained"
							startIcon={<MapPin />}
							sx={{ height: "40px", width: "100%" }}
						>
							Get Location
						</Button>
						<Tooltip title="Reset" placement="top" arrow>
						<Button
						onClick={resetLocation}
							sx={{
								borderRadius: "0 4px 4px 0",
								height: "40px",
								width: "40px",
								padding: "0",
							}}
						>
							<RotateCcw size={20} />
						</Button>
						</Tooltip>
					</ButtonGroup>
				</ListItem>
			</List>
			<Divider />
		</Box>
	);

	return (
		<Drawer open={open} onClose={toggleDrawer(false)} elevation={0}>
			<Toolbar style={{ padding: "0 16px", minHeight: "60px" }}>
				Settings
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
