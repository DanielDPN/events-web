import React, {useState} from "react";
import EventDataService from "../services/event.service";

const AddEvent = () => {
    const initialEventState = {
        id: null,
        name: "",
        date: "",
    };
    const [eventData, setEventData] = useState(initialEventState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setEventData({...eventData, [name]: value});
    };

    const saveEventData = () => {
        var data = {
            name: eventData.name,
            date: eventData.date
        };

        EventDataService.create(data)
            .then(response => {
                setEventData({
                    id: response.data.id,
                    name: response.data.name,
                    date: response.data.date,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newEventData = () => {
        setEventData(initialEventState);
        setSubmitted(false);
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
                                <div className="circle-tile-description text-faded"> Eventos</div>
                                <div className="submit-form">
                                    {submitted ? (
                                        <div>
                                            <h4>Evento salvo com sucesso!</h4>
                                            <button className="btn btn-success" onClick={newEventData}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="form-group">
                                                <label htmlFor="name">Nome</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    required
                                                    value={eventData.name}
                                                    onChange={handleInputChange}
                                                    name="name"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="date">Data</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="date"
                                                    required
                                                    value={eventData.date}
                                                    onChange={handleInputChange}
                                                    name="date"
                                                />
                                            </div>

                                            <button onClick={saveEventData} className="btn btn-success">
                                                <i className="fa fa-save"></i>
                                            </button>
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

export default AddEvent;
