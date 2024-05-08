import { useState, useEffect } from "react";
import Header from "./components/Header";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Search from "./features/Search";
import SettingsDrawer from "./features/Settings";
import { Settings } from "lucide-react";
import Background from "./components/Background";
import searchEngines from "./data/searchEngines";
import videoList from "./data/videoList";
import useLocation from "./hooks/useLocation";

function App() {

	const [autoPlay, setAutoPlay] = useState(true);
  const [keyProp, setKeyProp] = useState(Date.now());

  useEffect(() => {
    // Retrieve autoPlay state from local storage
    const storedAutoPlay = localStorage.getItem('autoPlay');
    if (storedAutoPlay !== null) {
      setAutoPlay(storedAutoPlay === 'true'); // Convert string to boolean
    }
  }, []);

  const handleAutoPlayToggle = () => {
    const newAutoPlay = !autoPlay; // Toggle autoPlay state
    setAutoPlay(newAutoPlay);
    localStorage.setItem('autoPlay', newAutoPlay); // Store new autoPlay state in local storage
    setKeyProp(Date.now()); // Remount Background component by changing key prop
  };
	

	// Set default color to either the value stored in local storage or '#e91e63' if no stored item
  const defaultColor = localStorage.getItem('selectedColor') || '#e91e63';
  const [color, setColor] = useState(defaultColor);

  // Function to handle color change
  const handleColorChange = (newColor) => {
    setColor(newColor);
    // Save the new color to local storage
    localStorage.setItem('selectedColor', newColor);
  };

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: color,
			},
		},
	});

	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [unit, setUnit] = useState(
		localStorage.getItem("unit") || "imperial"
	);
	const [showSeconds, setShowSeconds] = useState(
		localStorage.getItem("showSeconds") === "false" ? false : true
	);
	const [defaultSearchEngine, setDefaultSearchEngine] = useState("");

  const defaultVideo = videoList.find(video => video.title === 'Robot Workshop');
  const defaultVideoUrl = defaultVideo ? defaultVideo.url : ''; 
	const [currentVideo, setCurrentVideo] = useState(localStorage.getItem('selectedVideo') || defaultVideoUrl);

  const changeVideo = (video) => {
    console.log(`Changing video to: ${video}`);  
    setCurrentVideo(video);
    localStorage.setItem('selectedVideo', video);
  };

  const handleVideoChange = (event) => {
    const selectedVideoUrl = event.target.value;
    changeVideo(selectedVideoUrl);
  };

  useEffect(() => {
    const storedVideo = localStorage.getItem('selectedVideo');
    if (!storedVideo) { 
      setCurrentVideo(defaultVideoUrl);
    }
  }, [defaultVideoUrl]);

	const handleSecondsToggle = () => {
		setShowSeconds(!showSeconds);
		localStorage.setItem("showSeconds", !showSeconds);
	};

	useEffect(() => {
		const storedName = localStorage.getItem("name");
		if (storedName) {
			setName(storedName);
		}
	}, []);

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

	useEffect(() => {
		const savedDefaultSearchEngine = localStorage.getItem(
			"defaultSearchEngine"
		);
		setDefaultSearchEngine(
			savedDefaultSearchEngine || searchEngines[0].url
		);
	}, []);

	const { location, getCurrentLocation, resetLocation } = useLocation();

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
