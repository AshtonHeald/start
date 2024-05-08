import { X, MapPin, RotateCcw, Clock, SquarePlay } from "lucide-react";
import { MuiColorInput } from "mui-color-input";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";

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
	setDefaultSearchEngine,
	defaultSearchEngine,
	searchEngines,
	videoList,
	currentVideo,
	handleVideoChange,
	color,
	handleColorChange,
	autoPlay,
	handleAutoPlayToggle,
}) => {
	const handleNameChange = (event) => {
		updateName(event.target.value); // Update name when input changes
	};

	const DrawerList = (
		<Box sx={{ width: 250 }} role="presentation">
			<List subheader={<ListSubheader>Banner</ListSubheader>}>
				<ListItem>
					<Paper
						elevation={3}
						sx={{
							flexDirection: "row",
							display: "flex",
							alignItems: "center",
							width: "100%",
							borderRadius: "4px",
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: "40px",
								height: "40px",
								display: "grid",
								placeItems: "center",
							}}
						>
							<Clock />
						</ListItemIcon>
						<ListItemText id="" primary="Show Seconds" />
						<Switch
							sx={{ mr: "0px" }}
							edge="end"
							onChange={handleSecondsToggle}
							checked={showSeconds}
							inputProps={{
								"aria-labelledby": "",
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
					<ButtonGroup variant="contained" sx={{ width: "100%" }}>
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
			<List subheader={<ListSubheader>Search</ListSubheader>}>
				<ListItem>
					<FormControl fullWidth>
						<InputLabel id="engine-label">
							Default Engine
						</InputLabel>
						<Select
							labelId="engine-label"
							label="Default Engine"
							title="Default Search Engine"
							value={defaultSearchEngine}
							onChange={(e) => {
								setDefaultSearchEngine(e.target.value);
								localStorage.setItem(
									"defaultSearchEngine",
									e.target.value
								);
							}}
						>
							{searchEngines.map((engine) => (
								<MenuItem key={engine.name} value={engine.url}>
									{engine.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</ListItem>
				{/* <ListItem>Engine Options</ListItem>*/}
			</List>
			<Divider />
			<List subheader={<ListSubheader>Style</ListSubheader>}>
				<ListItem>
					<MuiColorInput
						label="Color"
						title="Primary Color"
						value={color}
						onChange={handleColorChange}
					/>
				</ListItem>
				<ListItem>
					<FormControl fullWidth>
						<InputLabel id="background-label">
							Background
						</InputLabel>
						<Select
							labelId="background-label"
							label="Background"
							title="Background Select"
							value={currentVideo}
							onChange={handleVideoChange}
						>
							{videoList.map((video, index) => (
								<MenuItem key={index} value={video.url}>
									{video.title}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</ListItem>
				<ListItem>
				<Paper
						elevation={3}
						sx={{
							flexDirection: "row",
							display: "flex",
							alignItems: "center",
							width: "100%",
							borderRadius: "4px",
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: "40px",
								height: "40px",
								display: "grid",
								placeItems: "center",
							}}
						>
							<SquarePlay />
						</ListItemIcon>
						<ListItemText id="" primary="Play Video" />
				<Switch
        sx={{ mr: "0px" }}
        edge="end"
        onChange={handleAutoPlayToggle}
        checked={autoPlay}
        inputProps={{ "aria-labelledby": "autoplay-switch" }}
      />
			</Paper>
				</ListItem>
			</List>
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


