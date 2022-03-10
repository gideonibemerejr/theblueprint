import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/auth";

export default function Nav() {
	const { pathname } = useLocation();
	const auth = useAuth();
	const navigate = useNavigate();
	return (
		<header className="bg-primary">
			<nav className=" mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="w-full py-6 flex items-center justify-between border-b border-primary lg:border-none">
					<div className="flex items-center">
						<Link to="/">
							<span className="text-2xl font-bold text-white">
								The Blueprint
							</span>
						</Link>
					</div>
					<div className="ml-10 space-x-4 w-full md:w-1/2 flex justify-end">
						{auth.user ? (
							<>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.paypal.com/paypalme/whenwherewhat?country.x=US&locale.x=en_US"
									className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-primary-600 hover:bg-primary-50 md:mx-6"
								>
									Donate
								</a>{" "}
								<button
									onClick={() => auth.logout(auth.user, navigate("/"))}
									className="inline-block bg-primary py-2 px-4 border border-white rounded-md text-base font-medium text-white hover:bg-opacity-75"
								>
									Log Out
								</button>
							</>
						) : (
							<div className="w-full flex items-center justify-end">
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.paypal.com/paypalme/whenwherewhat?country.x=US&locale.x=en_US"
									className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-primary-600 hover:bg-primary-50 md:mx-6"
								>
									Donate
								</a>
								<Link
									to={pathname === "/register" ? "/login" : "/register"}
									className="hidden md:inline-block bg-primary py-2 px-4 border border-white rounded-md text-base font-medium text-white hover:bg-opacity-75 "
								>
									{pathname === "/register" ? "Log In" : "Sign Up"}
								</Link>
							</div>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
}
