import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import React, { useState, useEffect} from 'react';
import AddCar from './AddCar';
import _ from 'lodash';
import Cars from './Cars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [allCars, setAllCars] = useState(null);
  const [search, setSearch] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if(localStorage){
      const carsLocalStorage = JSON.parse(localStorage.getItem('cars'));

      if(carsLocalStorage){
        saveCars(carsLocalStorage);
      }
      else{
        saveCars(cars)
      }
      
    }

  }, []);

  const saveCars = (cars) => {
    setAllCars(cars);
    setSearch(cars);
    if(localStorage){
      localStorage.setItem('cars', JSON.stringify(cars));
    }
  }

  const searchCars = () => {
    let keywordsArray = [];

    if(keywords){
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if(year){
      keywordsArray.push(year.toString());
    }

    if(keywordsArray.length > 0) {
      const search = allCars.filter(cars => {
        for(const word of keywordsArray){
          if(cars.make.toLowerCase().includes(word) ||
          cars.model.toLowerCase().includes(word) || 
          cars.year === parseInt(word)){
            return true;
          }
        }
        return false;
      });
      setSearch(search);
    } else {
      setSearch(allCars);
    }
  }

  const deleteCar = (carsToDelete) => {
    const updatedCarsArray = allCars.filter(cars => cars.id !== carsToDelete.id);
    saveCars(updatedCarsArray);
  }

  const updateCars = (updatedCars) => {
    const updatedCarsArray = allCars.map(cars => cars.id === updatedCars.id ? {...cars,...updatedCars } : cars);
    saveCars(updatedCarsArray);
  }

  const cars = [
    {
      id: nanoid(),
      make: 'Mclaren',
      year: 2021,
      model: '765lt',
      color: 'orange',
      image: 'images/orangeMclaren.jpg',
      msrp: 765000
    },
    {
      id: nanoid(),
      make: 'Ferrari',
      year: 2010,
      model: '458',
      color: 'Red',
      image: 'images/redFerrari.jpeg',
      msrp: 210000
    },
    {
      id: nanoid(),
      make: 'Lamborghini',
      year: 2015,
      model: 'Huracan',
      color: 'yellow',
      image: 'images/yellowHuracan.jpg',
      msrp: 240000
    },
    {
      id: nanoid(),
      make: 'Porsche',
      year: 2021,
      model: '911 gt3 rs',
      color: 'white',
      image: 'images/whiteGt3rs.jpg',
      msrp: 400000
    },
    {
      id: nanoid(),
      make: 'Nissan',
      year: 2018,
      model: 'gtr',
      color: 'black',
      image: 'images/blackGtr.jpg',
      msrp: 120000
    },
  ];

  const addCar = (newCar) => {
    const updatedCars = [...allCars, newCar];
    saveCars(updatedCars);
  }

  return (
    <div className='container'>
      <AddCar addCar={addCar} />
      <div className='row mt-4' id="search">
        <h2>Search Cars</h2>
        <div className='col-md-4'>
          <label htmlFor='txtKeywords'>Search by Make or Model</label>
          <input type="text" className='form-control' placeholder='Search' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}/>
        </div>
        <div className='col-md-4'>
          <select value={year} onChange={evt => setYear(evt.currentTarget.value)} className='form-select'>
            <option value="">Select Year</option>
            {_(allCars).map(cars => cars.year).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
          </select>
        </div>
        <div className='col-md-4'>
          <button type='button' className='btn btn-primary' onClick={searchCars}>Search <FontAwesomeIcon icon={faSearch}/></button>
        </div>
      </div>
      <div className='row' id="allCars">
        <h2>Current Cars</h2>
        {' '}
        {search &&
          search.map((cars) => (
            <div className='col-md-2' key={cars.id}>
              <Cars cars={cars} remove={deleteCar} updatedCars={updateCars} />
            </div>
          ))}
      </div>{' '}
      {!allCars && (
        <button type='button' className='btn btn-lg btn-success' onClick={() => saveCars(cars)}>
          {' '}
          Save Cars{' '}
        </button>
      )}{' '}
    </div>
  );
}

export default App;
