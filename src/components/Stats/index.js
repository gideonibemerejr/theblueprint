import { useAdminStats } from "../../hooks";
import Stat from "./Stat";

const Stats = () => {
	const { userCount, eventCount, staffPickCount } = useAdminStats();

	return (
		<div className="mb-5">
			<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				<Stat data={userCount?.userCount} />
				<Stat data={eventCount?.eventCount} />
				<Stat data={staffPickCount?.staffPickCount} />
			</dl>
		</div>
	);
};

export default Stats;
