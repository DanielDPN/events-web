import React, {useState, useEffect} from "react";
import EventDataService from "../services/event.service";

const Event = props => {
    const initialEventState = {
        id: null,
        name: "",
        date: ""
    };
    const [currentEvent, setCurrentEvent] = useState(initialEventState);
    const [message, setMessage] = useState("");

    const getEvent = id => {
        EventDataService.get(id)
            .then(response => {
                setCurrentEvent(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getEvent(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentEvent({...currentEvent, [name]: value});
    };

    const updateEvent = () => {
        EventDataService.update(currentEvent.id, currentEvent)
            .then(response => {
                console.log(response.data);
                setMessage("The event was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteEvent = () => {
        EventDataService.remove(currentEvent.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/events");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentEvent ? (
                <div className="edit-form">
                    <h4>Evento</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentEvent.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Data</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                value={currentEvent.date}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button className="badge badge-danger mr-2" onClick={deleteEvent}>
                        Apagar
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateEvent}
                    >
                        Atualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Clique em um Evento...</p>
                </div>
            )}
        </div>
    );
};

export default Event;
