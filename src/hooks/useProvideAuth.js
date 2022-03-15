import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import httpClient from "../utils/httpClient";
import { notification } from "../services";

function useProvideAuth() {
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadUserFromCookies() {
			const token = Cookies.get("token");
			if (token) {
				try {
					const { data: user } = await httpClient.get("/users/me");

					if (user) {
						setUser(user);
					}
				} catch (error) {
					Cookies.remove("token");
					setUser(null);
					delete httpClient.defaults.headers.common["Authorization"];
					notification.error(error.message);
				}
			}
			setLoading(false);
		}
		loadUserFromCookies();
	}, []);

	const login = async ({ identifier, password }, callback) => {
		try {
			const res = await httpClient.post("/auth/local", {
				identifier,
				password,
			});

			const {
				data: { jwt },
			} = res;

			Cookies.set("token", jwt, { expires: 60 });

			const { data: user } = await httpClient.get("/users/me");

			setUser(user);
			callback();
		} catch (error) {
			Cookies.remove("token");
			setUser(null);
			delete httpClient.defaults.headers.common["Authorization"];
			setError(error);
			notification.error(error.message);
		}
	};

	const logout = (callback) => {
		Cookies.remove("token");
		setUser(null);
		delete httpClient.defaults.headers.common["Authorization"];
		callback && callback();
	};

	const register = async (user, callback) => {
		try {
			const res = await httpClient.post("/auth/local/register", user);

			if (res && res.statusText === "OK") {
				const {
					data: { jwt, user },
				} = res;

				Cookies.set("token", jwt, { expires: 60 });

				setUser(user);
				callback();
			} else {
				setError(res?.error?.message || "Something went wrong");
			}
		} catch (error) {
			setError(error);
			notification.error(error.message);
		}
	};

	return {
		user,
		isAdmin: user?.email.includes("@whenwherewhat.com"),
		login,
		logout,
		register,
		error,
		loading,
	};
}

export default useProvideAuth;
