import { Link } from "react-router-dom";

const routes = [{path: "/", displayname: "Home"}, {path: "/medics", displayname: "For Medical Professionals"}];

function NavigationBar() {
    return (
    <header>
        <nav>
            <ul>
                {routes.map((route)=> {
                    return (
                        <li>
                            <Link to={route.path}>{route.displayname} </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    </header>
    );
}

export default NavigationBar;