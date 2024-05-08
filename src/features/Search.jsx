import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const SearchBar = ({ defaultSearchEngine, searchEngines }) => {
	const [searchTerms, setSearchTerms] = useState("");
	const [searchEngine, setSearchEngine] = useState("");

	useEffect(() => {
		const savedSearchEngine = localStorage.getItem("selectedSearchEngine");
		// Set default search engine if not found in local storage
		setSearchEngine(savedSearchEngine || defaultSearchEngine);
	}, [defaultSearchEngine]);

	const handleSearch = (e) => {
		e.preventDefault();
		window.open(searchEngine + encodeURIComponent(searchTerms));
		setSearchTerms("");
	};

	return (
		<FormControl
			component="form"
			id="searchBar"
			role="group"
			onSubmit={handleSearch}
			sx={{ display: "grid", placeItems: "center", marginTop: "15%" }}
		>
			<ButtonGroup
				variant="contained"
				aria-label="outlined primary button group"
				className="glass"
			>
				{/* Removed the default search engine select here */}
				<Select
					sx={{
						minWidth: 150,
						borderEndEndRadius: 0,
						borderStartEndRadius: 0,
					}}
					title="Search Engine"
					value={searchEngine}
					onChange={(e) => setSearchEngine(e.target.value)}
				>
					{searchEngines.map((engine) => (
						<MenuItem key={engine.name} value={engine.url}>
							{engine.name}
						</MenuItem>
					))}
				</Select>
				<TextField
					sx={{
						"& fieldset": {
							borderRadius: "0",
						},
						width: "300px",
					}}
					id="outlined-basic"
					variant="outlined"
					placeholder="Search the web"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					value={searchTerms}
					onChange={(e) => setSearchTerms(e.target.value)}
				/>
				<Button variant="contained" type="submit">
					Search
				</Button>
			</ButtonGroup>
		</FormControl>
	);
};

export default SearchBar;
