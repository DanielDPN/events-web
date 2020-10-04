import React, {useState, useEffect} from "react";

import EventService from "../services/event.service";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        EventService.getAll().then(
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
            <div className="container bootstrap snippet">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="circle-tile ">
                            <a href="/events">
                                <div className="circle-tile-heading dark-blue">
                                    <i className="fa fa-calendar fa-fw fa-3x"/></div>
                            </a>
                            <div className="circle-tile-content dark-blue">
                                <div className="circle-tile-description text-faded"> Eventos</div>
                                <div className="circle-tile-number text-faded ">{content.length}</div>
                                <a className="circle-tile-footer" href="/events">Visualizar<i
                                    className="fa fa-chevron-circle-right"/></a>
                                <a className="circle-tile-footer" href="/add">Adicionar<i
                                    className="fa fa-chevron-circle-right"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
