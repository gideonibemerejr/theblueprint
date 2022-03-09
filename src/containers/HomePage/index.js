import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

const HomePage = () => {
	const auth = useAuth();

	return auth?.user?.role?.type !== "admin" || auth?.user?.role?.id !== 3 ? (
		<Navigate to="/profile" />
	) : (
		<Navigate to="/admin" />
	);
};

export default HomePage;
