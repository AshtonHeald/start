import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { SearchIcon } from "lucide-react";
import InputAdornment from "@mui/material/InputAdornment";

// ========== SearchBar ==========
const SearchBar = () => {
	const [searchTerms, setSearchTerms] = useState("");
	const [searchEngine, setSearchEngine] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedSearchEngine = localStorage.getItem(
				"selectedSearchEngine"
			);
			if (savedSearchEngine) {
				setSearchEngine(savedSearchEngine);
			} else {
				setSearchEngine("http://www.google.com/search?q=");
			}
		}
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		if (typeof window !== "undefined") {
			localStorage.setItem("selectedSearchEngine", searchEngine);
		}
		window.open(searchEngine + encodeURIComponent(searchTerms));
		setSearchTerms("");
	};

	return (
		<FormControl
			component="form"
			id="searchBar"
			role="group"
			onSubmit={handleSearch}
			sx={{ display: "grid", placeItems: "center", marginTop: "20%" }}
			
		>
			<ButtonGroup
				variant="contained"
				aria-label="outlined primary button group"
				className="glass"
			>
				<Select
					sx={{ minWidth: 150, borderEndEndRadius: 0, borderStartEndRadius: 0}}
					title="Search Engine"
					value={searchEngine}
					onChange={(e) => setSearchEngine(e.target.value)}
				>
					<MenuItem value="http://www.google.com/search?q=">
						Google
					</MenuItem>
					<MenuItem value="https://duckduckgo.com/?q=">
						DuckDuckGo
					</MenuItem>
					<MenuItem value="https://www.youtube.com/results?search_query=">
						Youtube
					</MenuItem>
				</Select>
				<TextField
        sx={{ 
          '& fieldset': {
            borderRadius: '0',
          },
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

// ========= SearchButtons =========

const Search = () => {
	return <SearchBar />;
};

export default Search;
