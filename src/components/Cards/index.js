import { useMemo } from "react";
import CardItem from "./CardItem";

export default function Cards({ data }) {
	const memoizedData = useMemo(() => data, [data]);

	return (
		<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			{memoizedData.map((event) => {
				return <CardItem key={event.id} event={event} />;
			})}
		</ul>
	);
}
