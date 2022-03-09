import { useState } from "react";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { TicketIcon } from "@heroicons/react/outline";
import { startCase } from "lodash";
import moment from "moment";

import Emoji from "../Emoji";
const CardItem = ({ event }) => {
	const [notesOpen, setNotesOpen] = useState(false);

	const query = event?.address.split(" ").join("+");

	return (
		<li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
			<div className="w-full flex items-center justify-between p-6 space-x-6 ">
				<div className="flex-1 min-h-[260px]">
					<>
						{notesOpen ? (
							<div className="flex flex-col justify-between h-full mb-2">
								<strong className="mb-2">The Dirty Details™</strong>
								<p className="mt-1 text-gray-800">{event?.notes}</p>
							</div>
						) : (
							<>
								<div className="flex items-start justify-between space-x-3 mb-4">
									<h3 className="text-gray-900 text-xl font-medium ">
										{event.name}
									</h3>
									<span className="flex-shrink-0 inline-block px-2 py-0.5  font-medium ">
										{event.staffPick ? (
											<Emoji symbol="🅿️ " label="true" />
										) : null}
									</span>
								</div>

								{event?.startDate && (
									<p className="mt-1 text-gray-800">
										<strong className="mr-2">
											{moment(event?.startDate, "YYYY-MM-DD").format(
												"ddd, MMM D"
											)}
										</strong>
									</p>
								)}
								{event?.startTime && (
									<p className="mt-1 text-gray-800">
										<strong className="mr-2">Starts:</strong>
										{moment(event?.startTime, "h:mm a").format("h:mm a")}
									</p>
								)}
								{event?.endTime && (
									<p className="mt-1 text-gray-800">
										<strong className="mr-2">Ends:</strong>
										{moment(event?.endTime, "h:mm a").format("h:mm a")}
									</p>
								)}
								{event?.venue && (
									<p className="mt-1 text-gray-800">
										<strong className="mr-2">Location:</strong>
										{startCase(event?.venue)}
									</p>
								)}
								<p className="mt-1 text-gray-800">
									<strong className="mr-2">Free Drinks? </strong>
									{event?.freeDrinks ? (
										<Emoji symbol="🥃" label="true" />
									) : (
										"Nope"
									)}
								</p>
								<p className="mt-1 text-gray-800">
									<strong className="mr-2">Free Food?</strong>
									{event?.freeDrinks ? (
										<Emoji symbol="🌮 " label="true" />
									) : (
										"Nope"
									)}
								</p>
							</>
						)}
					</>
					{event?.notes && (
						<button
							onClick={() => setNotesOpen(!notesOpen)}
							type="button"
							className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{notesOpen ? "Close" : "Dirty details"}
						</button>
					)}
				</div>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-gray-200">
					{event?.link && (
						<div className="w-0 flex-1 flex">
							<a
								href={event?.link}
								target="_blank"
								rel="noreferrer"
								className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4  text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
							>
								<TicketIcon
									className="w-5 h-5 text-gray-400"
									aria-hidden="true"
								/>
								<span className="ml-3">Link</span>
							</a>
						</div>
					)}
					<div className="-ml-px w-0 flex-1 flex">
						<a
							href={`http://maps.google.com/maps?q=${query},+Austin,+Texas`}
							target="_blank"
							rel="noreferrer"
							className="relative w-0 flex-1 inline-flex items-center justify-center py-4  text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
						>
							<LocationMarkerIcon
								className="w-5 h-5 text-gray-400"
								aria-hidden="true"
							/>
							<span className="ml-3">Map</span>
						</a>
					</div>
				</div>
			</div>
		</li>
	);
};

export default CardItem;
