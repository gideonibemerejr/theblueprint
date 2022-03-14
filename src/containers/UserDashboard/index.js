import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../utils/auth";
import { UserHeader } from "../../components";

export default function UserDashboard() {
	const auth = useAuth();

	if (auth?.isAdmin) {
		return <Navigate to="/admin" />;
	}

	return (
		<div className="py-10">
			<header>
				<div className=" mx-auto px-4 sm:px-6 lg:px-8">
					<UserHeader />
				</div>
			</header>
			<main>
				<div className=" mx-auto px-4 sm:px-6 lg:px-8">
					{/* Replace with your content */}
					<Outlet />
				</div>
			</main>
		</div>
	);
}
