import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark py-3">
			<div className="container-fluid">
				<div className="mx-auto">
					<Link to="/" className="text-decoration-none">
						<span className="navbar-brand mb-0 h1 fs-1 text-white">
							Contact list
						</span>
					</Link>
				</div>
			</div>
		</nav>
	);
};