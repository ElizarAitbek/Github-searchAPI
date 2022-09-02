import { Routes, Route } from "react-router-dom";
import { FavouritePage } from "./pages/FavouritePage";
import { HomePage } from "./pages/HomePage";
import {Navigation} from "./components/Navigation"

function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/fav" element={<FavouritePage />} />
			</Routes>
		</>
	);
}

export default App;
