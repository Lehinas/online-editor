import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import {createBrowserRouter, RouterProvider} from "react-router"
import * as path from "path"
import TaskList from "./pages/TaskList/TaskList"
import TaskPage from "./pages/TaskPage/TaskPage"
import CodeRunner from "./pages/CodeRunner/CodeRunner"

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
)

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		children: [
			{
				path: "/",
				element: <TaskList />
			},
			{
				path: "task/:id",
				element: <TaskPage />
			},
			{
				path: "/playground",
				element: <CodeRunner />
			}
		]
	}
])

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)