import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import CarModel from './CarModel';
import RenderButtonComponent from './RouterButtonComponet';

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

const RenderMainComponent: React.FC<ModelObject> = (data) => {
  return (
    <>
      <Header></Header>
      <main>
        <section className='models-container'>
          <CarModel />
        </section>
        {data && data.items && data.items.length > 0 && <RenderButtonComponent />}
      </main>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  items: state.items,
});

export default connect(mapStateToProps)(RenderMainComponent);