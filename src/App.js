import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Router, Switch, Route, Link} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddEvent from "./components/AddEvent";
import Event from "./components/Event";

import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";

import {history} from "./helpers/history";
import EventsList from "./components/EventsList";

const App = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const {user: currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        }
    }, [currentUser]);

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <Link to={"/"} className="navbar-brand">
                        Events
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/events"} className="nav-link">
                                Eventos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Adicionar
                            </Link>
                        </li>
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/events" component={EventsList} />
                        <Route exact path="/add" component={AddEvent} />
                        <Route path="/events/:id" component={Event} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
