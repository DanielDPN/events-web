import React, {useState, useEffect} from "react";

import UserService from "../services/event.service";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getAll().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Sistema de Eventos</h3>
            </header>
        </div>
    );
};

export default Home;
