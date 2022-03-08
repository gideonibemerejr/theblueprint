import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, RegistrationPage, RequireAuth } from "..";
import { AuthProvider } from "../../utils/auth";
import { Layout } from "../../components";
import AdminDashboard from "../AdminDashboard";
import EventsPage from "../AdminDashboard/EventsPage";
// import SpreadSheetsPage from '../AdminDashboard/SpreadSheetsPage';
import UserDashboard from "../UserDashboard";
import BlueprintPage from "../UserDashboard/BlueprintPage";
import { usePageTracking } from "../../hooks";

function App() {
	usePageTracking();

	return (
		<AuthProvider>
			<Layout>
				<Routes>
					<Route
						path="/"
						element={
							<RequireAuth redirectTo="/login">
								<HomePage />
							</RequireAuth>
						}
					/>
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegistrationPage />} />

					<Route
						path="admin"
						element={
							<RequireAuth redirectTo="/login">
								<AdminDashboard />
							</RequireAuth>
						}
					>
						<Route index element={<EventsPage />} />
						<Route path="events" element={<EventsPage />} />
						{/* <Route path='spreadsheets' element={<SpreadSheetsPage />} /> */}
					</Route>
					<Route
						path="profile"
						element={
							<RequireAuth redirectTo="/login">
								<UserDashboard />
							</RequireAuth>
						}
					>
						<Route index element={<BlueprintPage />} />
						<Route path="blueprint" element={<BlueprintPage />} />
					</Route>
				</Routes>
			</Layout>

			<ToastContainer position="top-left" newestOnTop limit={5} />
		</AuthProvider>
	);
}

export default App;
