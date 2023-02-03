import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import App from "./pages/App";
import UserProvider from "./context/User";

const Root = () => {
	return (
		<BrowserRouter basename={"/"}>
			<PerfectScrollbar>
				<UserProvider>
					<App/>
				</UserProvider>
			</PerfectScrollbar>
		</BrowserRouter>
	);
};

const container = document.getElementById("root");
const root = createRoot(container)
root.render(<React.StrictMode><Root /></React.StrictMode>);