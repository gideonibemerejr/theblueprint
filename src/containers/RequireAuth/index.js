import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/auth";

const RequireAuth = ({ children, redirectTo, withAdminRights }) => {
	let auth = useAuth();
	let location = useLocation();

	if (!!withAdminRights) {
		if (auth?.user?.role?.type !== "admin" || auth?.user?.role?.id !== 3) {
			return <Navigate to={redirectTo} />;
		}
	}

	if (!auth.user && !auth.loading) {
		return <Navigate to={redirectTo} state={{ from: location }} replace />;
	}

	return children;
};

export default RequireAuth;
