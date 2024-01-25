import React, { useState } from 'react' ;
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CarModelsData from '../store/modelData';
import '../styles/carModel.css'

interface CarModelProps {
  addItem: (item: object) => void
}

const CarModels: React.FC<CarModelProps> = ({addItem}) => {
  let displayForm: boolean = true;
  const [form, setForm] = useState({
    model: '',
    color: '',
    yearOfManufacture: '',
    insuranceValidUpto: '',
    kms: '',
    location: '',
    noOfOwner: '',
    transmission: '',
    bodyType: '',
    photo: '',
    fuelType: '',
    budget: ''
  });
  
  const handleInputChange = (identifier: string, value: string) => {
    setForm(existingModel => ({
      ...existingModel,
      [identifier]: value
    }));
    displayForm = true;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    addItem(form);
    setForm({
      model: '',
      color: '',
      yearOfManufacture: '',
      insuranceValidUpto: '',
      kms: '',
      location: '',
      noOfOwner: '',
      transmission: '',
      bodyType: '',
      photo: '',
      fuelType: '',
      budget: ''
    });
    displayForm = false;
  }

  return (
    <>
      <div className='car-models-div'>
        {CarModelsData.map((item) => (
            <div className="car-models" onClick={(event) => handleInputChange('model', item.modelName)}>
              <img className="" src={item.image} alt={item.modelName}></img>
              <p>{item.modelName}</p>
            </div>
          ))}
      </div>
      {form.model && displayForm && <form onSubmit={handleSubmit}>
        <div className='car-model-form'>
          <div>
            <div className='form-group'>
              <label htmlFor='modelName'>Model </label>
              <input type="text" id='modelName' name='modelName' value={form.model} autoComplete="off" readOnly />
            </div>
            
            <div className='form-group'>
              <label htmlFor='color'>Color </label>
              <input type='text' id='color' name='color' value={form.color} onChange={(event) => handleInputChange('color', event.target.value)} autoComplete="off" />
            </div>

            <div className='form-group'>
              <label htmlFor='year'>Year of manufacture </label>
              <input type='text' id='year' name='year' value={form.yearOfManufacture} autoComplete="off" onChange={(event) => handleInputChange('yearOfManufacture', event.target.value)} />
            </div>

            <div className='form-group'>
              <label htmlFor='insurance'>Insurance valid upto </label>
              <input type='text' id='insurance' name='insurance' value={form.insuranceValidUpto} autoComplete="off" onChange={(event) => handleInputChange('insuranceValidUpto', event.target.value)} />
            </div>
            
            <div className='form-group'>
              <label htmlFor='kms'>kms </label>
              <input type='text' id='kms' name='kms' value={form.kms} autoComplete="off" onChange={(event) => handleInputChange('kms', event.target.value)} />
            </div>

            <div className='form-group'>
              <label htmlFor='budget'>Expected cost </label>
              <input type='text' id='budget' name='budget' value={form.budget} autoComplete="off" onChange={(event) => handleInputChange('budget', event.target.value)} />
            </div>
          </div>
          <div>
            <div className='form-group'>
              <label htmlFor='location'>Location </label>
              <input type="text" id='location' name='location' value={form.location} autoComplete="off" onChange={(event) => handleInputChange('location', event.target.value)} />
            </div>
            
            <div className='form-group'>
              <label htmlFor='owners'>No of owners </label>
              <input type='text' id='owners' name='owners' value={form.noOfOwner} autoComplete="off" onChange={(event) => handleInputChange('noOfOwner', event.target.value)} />
            </div>  

            <div className='form-group'>
              <label htmlFor='transmission'>Transmission </label>
              <input type='text' id='transmission' name='transmission' value={form.transmission} autoComplete="off" onChange={(event) => handleInputChange('transmission', event.target.value)} />
            </div>

            <div className='form-group'>
              <label htmlFor='fitments'>External fitments </label>
              <input type='text' id='fitments' name='fitments' value={form.bodyType} autoComplete="off" onChange={(event) => handleInputChange('bodyType', event.target.value)} />
            </div>
            
            <div className='form-group'>
              <label htmlFor='fuelType'>Fuel Type </label>
              <input type='text' id='fuelType' name='fuelType' value={form.fuelType} autoComplete="off" onChange={(event) => handleInputChange('fuelType', event.target.value)} />
            </div>

            <div className='form-group'>
              <label htmlFor='photo'>Photo </label>
              <input type='file' id='photo' name='photo' value={form.photo} autoComplete="off" onChange={(event) => handleInputChange('photo', event.target.value)} />
            </div>
          </div>
        </div>
        <div className='submit-button-div'>
          <button className='button'>Submit</button>
        </div>
      </form>}
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addItem: (item: object) => dispatch({ type: 'ADD_ITEM', payload: item }),
});

export default connect(null, mapDispatchToProps)(CarModels);
