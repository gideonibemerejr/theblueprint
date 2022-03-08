export const EVENT_COLUMNS = [
	{
		label: "Staff Pick?",
		name: "staffPick",
	},
	{
		label: "Event",
		name: "name",
	},
	{
		label: "Link",
		name: "link",
	},
	{
		label: "Venue",
		name: "venue",
	},
	{
		label: "Start Date",
		name: "startDate",
	},

	{
		label: "Start Time",
		name: "startTime",
	},
	{
		label: "End Time",
		name: "endTime",
	},
	{
		label: "Free Drinks?",
		name: "freeDrinks",
	},
	{
		label: "Free Food",
		name: "freeFood",
	},
	{
		label: "Notes",
		name: "notes",
	},
];

export const INITIAL_EVENT_COLUMNS = EVENT_COLUMNS.map(
	(column) => Object.values(column)[1]
);
