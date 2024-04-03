import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Auth.js";
import NotePad from "./Note.jsx";

function App() {
	return (
		<div >
			<Routes>
				<Route path='/signup' element= {<SignUp />} />
				<Route path='/note' element= {<NotePad />} />


			</Routes>
		</div>
	);
}

export default App;