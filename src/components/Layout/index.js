import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<>
			<Nav />
			<div className="mx-auto sm:px-6 lg:px-8 bg-primary min-h-[85vh]">
				{/* Content goes here */}
				{children}
			</div>
			<Footer />
		</>
	);
};

export default Layout;
