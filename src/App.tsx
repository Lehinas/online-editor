import React, {FC} from "react"
import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import {Outlet} from "react-router"

const App: FC = () => {
	return (
		<div className={"App"}>
			<Navbar/>
			<Outlet/>
		</div>
	)
}

export default App