import {
	UsersIcon,
	CalendarIcon,
	BadgeCheckIcon,
} from "@heroicons/react/outline";

export const eventCountAdapter = ({ meta }) => {
	return {
		label: "Total Events",
		value: meta?.pagination?.total,
		icon: CalendarIcon,
	};
};

export const userCountAdapter = (count) => {
	return {
		label: "Total Users",
		value: count,
		icon: UsersIcon,
	};
};

export const staffPickCountAdapter = ({ meta }) => {
	return {
		label: "Total Staff Picks",
		value: meta?.pagination?.total,
		icon: BadgeCheckIcon,
	};
};
