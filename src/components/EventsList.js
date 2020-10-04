import React, {useState, useEffect} from "react";
import EventDataService from "../services/event.service";
import {Link} from "react-router-dom";
import moment from "moment";

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveEvents();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveEvents = () => {
        EventDataService.getAll()
            .then(response => {
                setEvents(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveEvents();
        setCurrentEvent(null);
        setCurrentIndex(-1);
    };

    const setActiveEvent = (tutorial, index) => {
        setCurrentEvent(tutorial);
        setCurrentIndex(index);
    };

    const removeAllEvents = () => {
        EventDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        EventDataService.findByName(searchName)
            .then(response => {
                setEvents(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar pelo nome"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Lista de Eventos</h4>

                <ul className="list-group">
                    {events &&
                    events.map((event, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveEvent(event, index)}
                            key={index}
                        >
                            {event.name}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllEvents}
                >
                    Apagar Todos
                </button>
            </div>
            <div className="col-md-6">
                {currentEvent ? (
                    <div>
                        <h4>Evento</h4>
                        <div>
                            <label>
                                <strong>Nome:</strong>
                            </label>{" "}
                            {currentEvent.name}
                        </div>
                        <div>
                            <label>
                                <strong>Data:</strong>
                            </label>{" "}
                            {moment(currentEvent.date).utc().format('DD/MM/yyyy')}
                        </div>
                        <div>
                            <label>
                                <strong>Usuário:</strong>
                            </label>{" "}
                            {currentEvent.user.username}
                        </div>

                        <Link
                            to={"/events/" + currentEvent.id}
                            className="badge badge-warning"
                        >
                            Editar
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Clique em um Evento...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsList;
