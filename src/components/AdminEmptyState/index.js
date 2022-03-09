import { PlusIcon } from "@heroicons/react/solid";
import { startCase } from "lodash";
const AdminEmptyState = ({
	setCurrentModal,
	setOpen,
	type,
	plural,
	modalType,
}) => {
	return (
		<div className="text-center">
			<svg
				className="mx-auto h-12 w-12 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					vectorEffect="non-scaling-stroke"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
				/>
			</svg>
			<h3 className="mt-2 text-sm font-medium text-white">
				No {startCase(plural)}
			</h3>
			<p className="mt-1 text-sm text-gray-200">
				Get started by creating a new {type}.
			</p>
			<div className="mt-6">
				<button
					onClick={() => {
						setCurrentModal(modalType);
						setOpen((prevState) => !prevState);
					}}
					type="button"
					className="inline-flex items-center px-4 py-2 border border-white shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
					New {startCase(type)}
				</button>
			</div>
		</div>
	);
};

export default AdminEmptyState;
