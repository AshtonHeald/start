import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";

import Background from "./components/Background";
import Header from "./components/Header";
import Search from "./features/Search";
import SettingsDrawer from "./features/Settings";

import searchEngines from "./data/searchEngines";
import videoList from "./data/videoList";
import useLocation from "./hooks/useLocation";

const defaultVideo = videoList.find(video => video.title === 'Robot Workshop');
const defaultVideoUrl = defaultVideo ? defaultVideo.url : ''; 

function App() {
	// State hooks
	const [autoPlay, setAutoPlay] = useState(true);
  const [keyProp, setKeyProp] = useState(Date.now());
	const [color, setColor] = useState(localStorage.getItem('selectedColor') || '#e91e63');
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [unit, setUnit] = useState(localStorage.getItem("unit") || "imperial");
	const [showSeconds, setShowSeconds] = useState(localStorage.getItem("showSeconds") !== "false");
	const [defaultSearchEngine, setDefaultSearchEngine] = useState("");
	const [currentVideo, setCurrentVideo] = useState(localStorage.getItem('selectedVideo') || defaultVideoUrl);

	// Declarations
	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: color,
			},
		},
	});
 
	const { location, getCurrentLocation, resetLocation } = useLocation();

	// Effects
  useEffect(() => {
    const storedAutoPlay = localStorage.getItem('autoPlay');
    if (storedAutoPlay !== null) {
      setAutoPlay(storedAutoPlay === 'true');
    }
  }, []);

	useEffect(() => {
    const storedVideo = localStorage.getItem('selectedVideo');
    if (!storedVideo) { 
      setCurrentVideo(defaultVideoUrl);
    }
  }, [defaultVideoUrl]);

	useEffect(() => {
		const storedName = localStorage.getItem("name");
		if (storedName) {
			setName(storedName);
		}
	}, []);

	useEffect(() => {
    const savedDefaultSearchEngine = localStorage.getItem("defaultSearchEngine");
    setDefaultSearchEngine(savedDefaultSearchEngine || searchEngines[0].url);
	}, []);

	// Functions
  const handleAutoPlayToggle = () => {
    const newAutoPlay = !autoPlay;
    setAutoPlay(newAutoPlay);
    localStorage.setItem('autoPlay', newAutoPlay);
    setKeyProp(Date.now());
	};

	const handleColorChange = (newColor) => {
		setColor(newColor);
		localStorage.setItem('selectedColor', newColor);
	};

	const changeVideo = (video) => {
    setCurrentVideo(video);
    localStorage.setItem('selectedVideo', video);
  };

  const handleVideoChange = (event) => {
    const selectedVideoUrl = event.target.value;
    changeVideo(selectedVideoUrl);
  };

	const handleSecondsToggle = () => {
		setShowSeconds(!showSeconds);
		localStorage.setItem("showSeconds", !showSeconds);
	};

	const updateName = (newName) => {
		setName(newName);
		localStorage.setItem("name", newName);
	};

	const handleUnitChange = (event) => {
		const newUnit = event.target.value;
		setUnit(newUnit);
		localStorage.setItem("unit", newUnit);
	};

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ height: "100vh" }}>
			<ThemeProvider theme={darkTheme}>
			<CssBaseline />
      <Background videoUrl={currentVideo} autoPlay={autoPlay} keyProp={keyProp} />
				<Header
					color={color}
					name={name}
					location={location}
					unit={unit}
					showSeconds={showSeconds}
				/>
				<SettingsDrawer
					open={open}
					toggleDrawer={toggleDrawer}
					handleDrawerClose={handleDrawerClose}
					updateName={updateName}
					name={name}
					getCurrentLocation={getCurrentLocation}
					resetLocation={resetLocation}
					handleUnitChange={handleUnitChange}
					unit={unit}
					handleSecondsToggle={handleSecondsToggle}
					showSeconds={showSeconds}
					setDefaultSearchEngine={setDefaultSearchEngine}
					defaultSearchEngine={defaultSearchEngine}
					searchEngines={searchEngines}
					videoList={videoList}
					currentVideo={currentVideo}
					handleVideoChange={handleVideoChange}
					color={color}
					handleColorChange={handleColorChange}
					autoPlay={autoPlay}
					handleAutoPlayToggle={handleAutoPlayToggle}
				/>
				<Search
					defaultSearchEngine={defaultSearchEngine}
					searchEngines={searchEngines}
				/>
				<Box sx={{ position: "fixed", bottom: "0", left: "0" }}>
					<IconButton
						onClick={toggleDrawer(true)}
						sx={{ m: "12px" }}
						className="glass"
					>
						<Settings />
					</IconButton>
				</Box>
			</ThemeProvider>
		</Box>
	);
}

export default App;
