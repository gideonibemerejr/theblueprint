import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { notification } from "../../services";
import { useAuth } from "../../utils/auth";
import { AdminHeader, CreateModal } from "../../components";
import httpClient from "../../utils/httpClient";

export default function AdminDashboard() {
	const [open, setOpen] = useState(false);
	const [currentModal, setCurrentModal] = useState(null);

	const handleSync = async () => {
		try {
			const response = await httpClient.get("/sync");

			if (response.status === 200 && !!response.data.count) {
				notification.success(
					`${response.data.count} events were synced successfully`
				);
			}
		} catch (error) {
			notification.error(error.message);
		}
	};

	const auth = useAuth();

	if (!auth?.isAdmin) {
		return <Navigate to="/profile/blueprint" />;
	}

	return (
		<div className="py-10">
			<header>
				<div className=" mx-auto px-4 sm:px-6 lg:px-8">
					<AdminHeader>
						<div className="mt-3 flex md:mt-0 md:absolute md:top-3 md:right-0">
							<button
								onClick={handleSync}
								type="button"
								className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
							>
								Sync with Google Sheet
							</button>
						</div>
					</AdminHeader>
				</div>
			</header>
			<main>
				<div className=" px-4 mx-auto sm:px-6 lg:px-8">
					{/* Replace with your content */}
					<Outlet
						context={{
							setCurrentModal,
							setOpen,
						}}
					/>
					{/* /End replace */}
					<CreateModal open={open} setOpen={setOpen} formType={currentModal} />
				</div>
			</main>
		</div>
	);
}
