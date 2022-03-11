const Stat = ({ data }) => {
	return (
		<div
			key={data?.label}
			className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
		>
			<dt>
				<div className="absolute bg-primary-500 rounded-md p-3">
					{data?.icon && (
						<data.icon className="h-6 w-6 text-white" aria-hidden="true" />
					)}
				</div>
				<p className="ml-16 text-sm font-medium text-gray-500 truncate">
					{data?.label}
				</p>
			</dt>
			<dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
				<p className="text-2xl font-semibold text-gray-900">{data?.value}</p>

				<div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
					<div className="text-sm">
						<a
							href="#"
							className="font-medium text-primary-600 hover:text-primary-500"
						>
							{" "}
							View all<span className="sr-only"> {data?.label} stats</span>
						</a>
					</div>
				</div>
			</dd>
		</div>
	);
};

export default Stat;
