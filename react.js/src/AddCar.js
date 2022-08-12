import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddCar.css';

function AddCar(props){
 // make year model color
    const[make,setMake] = useState("");
    const[model,setModel] = useState("");
    const[year,setYear] = useState("");
    const[color,setColor] = useState("");
    const[selectedFile,setSelectedFile] = useState();
    const[msrp,setMsrp] = useState();


    const create = () => {
      const newCar = {"id":nanoid(), "make":make, "model":model, "year":parseInt(year ), "color":color, "image":URL.createObjectURL(selectedFile),"msrp":msrp};
      props.addCar(newCar);
    }

    const imageUpdate = (event) => {
      setSelectedFile(event.target.files[0]);
    }

    return(
        <div className='row mt-3 mb-3' id="addCar">
            <h2>Add Cars</h2>
            <div className='col-md-2'>
                <label htmlFor='txtMake' className='form-label'>Make</label>
                <input type="text" id="txtMake" placeholder='Enter Car Make' className='form-control' onChange={(evt) => setMake(evt.currentTarget.value)} value={make} />
            </div>
            <div className='col-md-2'>
            <label htmlFor='txtModel' className='form-label'>Model</label>
            <input type="text" id="txtModel" placeholder='Enter Car Model' className='form-control' onChange={(evt) => setModel(evt.currentTarget.value)} value={model} />
            </div>
            <div className='col-md-2'>
            <label htmlFor='txtYear' className='form-label'>Year</label>
            <input type="number" id="txtYear" placeholder='Enter Car Year' className='form-control' onChange={(evt) => setYear(evt.currentTarget.value)} value={year} />
            </div>
            <div className='col-md-2'>
            <label htmlFor='txtColor' className='form-label'>Color</label>
            <input type="text" id="txtColor" placeholder='Enter Car Color' className='form-control' onChange={(evt) => setColor(evt.currentTarget.value)} value={color} />
            </div>
            <div className='col-md-2'>
            <label htmlFor='txtMsrp' className='form-label'>Msrp</label>
            <input type="number" id="txtMsrp" placeholder='Enter Car Msrp' className='form-control' onChange={(evt) => setMsrp(evt.currentTarget.value)} value={msrp} />
            </div>
            <div className='col-md-2'>
                <label htmlFor='fileUpload' className='form-label'>Car Image</label>
                <input type="file" name="file" id="fileUpload" onChange={imageUpdate}/>
            </div>
            <div className='col-md-2'>
                <button type="button" id="btnAdd" className='btn btn-primary btn-lg' onClick={create}>Add Car <FontAwesomeIcon icon={faPlusCircle}/></button>
            </div>
        </div>
    )
}


export default AddCar;