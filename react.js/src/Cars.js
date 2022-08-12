import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faEdit } from '@fortawesome/free-solid-svg-icons';

function Cars(props){

    const [edit, setEdit] = useState(false);
    const[make,setMake] = useState("");
    const[model,setModel] = useState("");
    const[year,setYear] = useState("");
    const[color,setColor] = useState("");
    const[msrp,setMsrp] = useState();

    useEffect(() => {
        setMake(props.cars.make);
        setModel(props.cars.model);
        setYear(props.cars.year);
        setColor(props.cars.color);
        setMsrp(props.cars.msrp);
    }, []);

    const saveCars = () => {
        setEdit(false);
        const updatedCars = {make:make, model:model, year:year, color:color, msrp:msrp, id:props.cars.id, image:props.cars.image};
        props.updateCars(updatedCars);
    }
     

return(
    <div className="card">
        <img src={props.cars.image} alt="cars" className='card-img-top mx-auto'/>
        {!edit && <ul className="list-group list-group-flush">
        <li className='list-group-item'> {props.cars.make} </li> <li className='list-group-item'> {props.cars.year} </li>{' '}
        <li className='list-group-item'> {props.cars.model} </li>{' '}
        <li className='list-group-item'> {props.cars.color} </li>{' '}
        <li className='list-group-item'> {props.cars.msrp} </li>{' '}
        <button type='button' className="btn btn-danger" onClick={() => props.remove(props.cars)}>Delete <FontAwesomeIcon icon={faWarning}/></button>
        <button type='button' className="btn btn-warning" onClick={() => setEdit(true)}>Edit <FontAwesomeIcon icon={faEdit}/></button>
        </ul>
        }  
        {edit &&
        <ul className="list-group list-group-flush">
        <li className='list-group-item'><input type="text" className="form-control" value={make} onChange={(evt) => setMake(evt.currentTarget.value)}/></li>
        <li className='list-group-item'><input type="text" className="form-control" value={model} onChange={(evt) => setModel(evt.currentTarget.value)}/></li>
        <li className='list-group-item'><input type="number" className="form-control" value={year} onChange={(evt) => setYear(evt.currentTarget.value)}/></li>
        <li className='list-group-item'><input type="text" className="form-control" value={color} onChange={(evt) => setColor(evt.currentTarget.value)}/></li>
        <li className='list-group-item'><input type="number" className="form-control" value={msrp} onChange={(evt) => setMsrp(evt.currentTarget.value)}/></li>
        <li className="list-group-item"><button id='btnSave' className="btn btn-secondary" onClick={saveCars}>Save</button></li>
        </ul>
        }
    </div>
)};

export default Cars;