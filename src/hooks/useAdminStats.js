import QueryString from "qs";
import useSWR from "swr";
import { users, events } from "../services";

const useAdminStats = () => {
	const staffPickQuery = QueryString.stringify(
		{
			filters: {
				staffPick: {
					$eq: true,
				},
			},
		},
		{ encodeValuesOnly: true }
	);

	const { data: userCount, error: userCountError } = useSWR(
		"/users/count",
		users.getUserCount
	);

	const { data: eventCount, error: eventCountError } = useSWR(
		"/blue-sheet-events",
		events.getEventCount
	);

	const { data: staffPickCount, error: staffPickCountError } = useSWR(
		`/blue-sheet-events?${staffPickQuery}`,
		events.getStaffPickCount
	);

	return {
		userCount,
		userCountError,
		eventCount,
		eventCountError,
		staffPickCount,
		staffPickCountError,
	};
};

export default useAdminStats;
