import { Link } from "react-router-dom";

function InvalidRoute() {
    return (<div className="container mt-5">
        <div className="col"></div>
        <div className="col">
            <h2 className="mb-4">404 - Page Not Found</h2>
            <h4 className="mb-4">The page you have requested does not Exist!</h4>
            <Link to={"/"}>Go back to home page</Link>
        </div>
        <div className="col"></div>
    </div>)
}

export default InvalidRoute