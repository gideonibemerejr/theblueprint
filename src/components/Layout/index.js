import Nav from "./Nav";

const Layout = ({ children }) => {
	return (
		<>
			<Nav />
			<div className="mx-auto sm:px-6 lg:px-8 bg-primary min-h-screen">
				{/* Content goes here */}
				{children}
			</div>
		</>
	);
};

export default Layout;
