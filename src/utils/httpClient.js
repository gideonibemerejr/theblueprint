import axios from "axios";
import Cookies from "js-cookie";

const httpClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

httpClient.interceptors.request.use((config) => {
	const token = Cookies.get("token");
	config.headers.Authorization = token ? `Bearer ${token}` : "";

	return config;
});

export default httpClient;
