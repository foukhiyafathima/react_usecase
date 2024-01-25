import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../styles/filterModel.css';

interface DataObject {
  value: string;
  name: string;
}

interface ItemObject {
  model: string,
  color: string,
  yearOfManufacture: string,
  insuranceValidUpto: string,
  kms: string,
  location: string,
  noOfOwner: string,
  transmission: string,
  bodyType: string,
  photo: string,
  fuelType: string,
  budget: string
}

interface ModelObject {
  items: Array<ItemObject>
}

const FilterComponent: React.FC<ModelObject> = (data) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<DataObject[]>([]);
  const [filteredData, setFilteredData] = useState(data['items']);
  const [filterConditions, setFilterConditions] = useState<any>();
  const fieldMapping = ((type: string) => {
    let mappedArr:Array<object> = [];
    if (data && data.items && data.items.length > 0) {
      mappedArr = data['items'].map((item: any) => {
        if (item[type] !== '') {
          return { value: item[type], name: item[type] }
        }
        return {};
      });
    }
    return removeDuplicated(mappedArr);
  })
  const removeDuplicated = ((array: Array<any>) => {
    var uniq = [...new Set(array.map(({ value }) => value))].map(e => array.find(({ value }) => value == e));
    uniq = uniq.filter(arr => Object.keys(arr).length !== 0);
    return uniq;
  })
  const locationArr = fieldMapping('location');
  const brandArr = fieldMapping('model');
  const ownerArr = fieldMapping('noOfOwner');
  const budgetArr = fieldMapping('budget');
  const fuelType = fieldMapping('fuelType');
  const transmissionArr = fieldMapping('transmission');
  const bodyTypeArr = fieldMapping('bodyType');
  
  // Function to fetch suggestions from the pre-populated list
  const fetchSuggestions = (query: string) => {
    // Filter the list of options to return only those that match the query
    const filteredSuggestions = bodyTypeArr.filter((option) => option.value.toLowerCase().includes(query.toLowerCase()));
  }

  // Function to handle filtering based on conditions
  const handleFilter = (condition: {field: string, value: string}) => {
    const filteredResults = data.items.filter((item: ItemObject) => {
      if (condition.field === 'location') {
        return item.location === filterConditions[condition.field];
      } 
      if (condition.field === 'model') {
        return filterConditions[condition.field].includes(item.model);
      } 
      if (condition.field === 'noOfOwner') {
        return item.noOfOwner === filterConditions[condition.field];
      } 
      if (condition.field === 'fuelType') {
        return item.fuelType === filterConditions[condition.field];
      } 
      if (condition.field === 'transmission') {
        return item.fuelType === filterConditions[condition.field];
      } 
      if (condition.field === 'budget') {
        return item.budget === filterConditions[condition.field];
      } 
      if (condition.field === 'bodyType') {
        setInputValue(condition.value);
        setSuggestions([]); 
      }
    });

    setFilteredData(filteredResults);
  };


  return (
    <div className='filter-container'>
      <div>
        <h4>Results</h4>
        <>
          {(filteredData && filteredData.length > 0 ? 
            <div>{JSON.stringify(filteredData, null, 2)}</div>  : <div>There is no data with this filters</div>
          )}
        </>
        
      </div>
      <div>
        <h4>Filters:</h4>
        {data && <form>
          <div className='form-container'>
            <div className='form-group'>
              <div className='form-group-label'>
                <label htmlFor="location">Location:</label>
              </div>
              <select id="location" onChange={(event) => handleFilter({ field: 'location', value: event.target.value })}>
                {locationArr && locationArr.map((item, index) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <div className='form-group-label'>
                <label htmlFor="bodyType">Body Type:</label>
              </div>
              <input
                type="text"
                id='bodyType'
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                  fetchSuggestions(event.target.value);
                }}
                placeholder='Type to search'
                // onSelect={(event) => {
                //   setInputValue(event.target.);
                //   setSuggestions([]);
                // }}
              />
              {/* {suggestions.length > 0 && ( */}
                <ul>
                {suggestions.map((suggestion) => (
                  <li key={suggestion.value} onClick={() => handleFilter({field: 'bodyType', value: suggestion.name})}>
                    {suggestion.name}
                  </li>
                ))}
                  {/* {suggestions.map((suggestion) => (
                    <li key={suggestion.value}>{suggestion.name}</li>
                  ))} */}
                </ul>
              {/* )} */}
            </div>

            <div className='form-group'>
              <div className='form-group-label'>
                <label htmlFor="brand">Brand:</label>
              </div>
              {brandArr && brandArr.map((item, index) => (
                <>
                  <div className='form-group-controls'>
                    <input className="form-check-input" type="checkbox" name="brand" value={item.value} id="brand" onChange={(event) => handleFilter({ field: 'model', value: event.target.value })} />
                    <label htmlFor="brand">{item.name}</label>
                  </div>
                </>
              ))}
            </div>

            <div className='form-group'>
              <div className='form-group-label'>
                <label htmlFor='owner'>Owners:</label>
              </div>
              {ownerArr && ownerArr.map((item, index) => (
                <>
                  <div className='form-group-controls'>
                    <input className="form-check-input" type='radio' name='owner' value={item.value} id="owner" onChange={(event) => handleFilter({ field: 'noOfOwner', value: event.target.value })} />
                    <label htmlFor="owner">{item.name}</label>
                  </div>
                </>
              ))}
            </div>

            <div className='form-group'>
              <div className='form-group-label'>
                <label htmlFor='budget'>Budget:</label>
              </div>
              {budgetArr && budgetArr.map((item, index) => (
                <>
                  <div className='form-group-controls'>
                    <div key={item.value} className="chip" onClick={(event) => handleFilter({ field: 'budget', value: item.value })}>
                      {item.name}
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className='form-group'>
              <div className='form-group-label'>
                <label htmlFor='fuelType'>Fuel Type:</label>
              </div>
              {fuelType && fuelType.map((item, index) => (
                <>
                  <div className='form-group-controls'>
                    <input className="form-check-input" type='radio' name='fuelType' value={item.value} id="fuelType" onChange={(event) => handleFilter({ field: 'fuelType', value: event.target.value })} />
                    <label htmlFor="fuelType">{item.name}</label>
                  </div>
                </>
              ))}
            </div>

            <div className='form-group'>
              <div className='form-group-label'>
                <label htmlFor='transmission'>Transmission:</label>
              </div>
              {transmissionArr && transmissionArr.map((item, index) => (
                <>
                  <div className='form-group-controls'>
                    <input className="form-check-input" type='radio' name='fuelType' value={item.value} id="transmission" onChange={(event) => handleFilter({ field: 'transmission', value: event.target.value })} />
                    <label htmlFor="transmission">{item.name}</label>
                  </div>
                </>
              ))}
            </div>
          </div>
        </form>}

      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  items: state.items,
});

export default connect(mapStateToProps)(FilterComponent);

