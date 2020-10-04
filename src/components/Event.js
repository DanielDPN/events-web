import React, {useState, useEffect} from "react";
import EventDataService from "../services/event.service";
import moment from "moment";

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
                response.data.date = moment(response.data.date).utc().format('yyyy-MM-DD');
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
                setMessage("Evento salvo com sucesso!");
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

                                            <button className="btn btn-danger" onClick={deleteEvent}>
                                                <i className="fa fa-trash"></i>
                                            </button>

                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                                onClick={updateEvent}
                                            >
                                                <i className="fa fa-save"></i>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event;
