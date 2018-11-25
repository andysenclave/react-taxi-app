import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalMap from '../components/ModalMap/modalMap.jsx';
import Card from '../components/Card/card.jsx';

class ListContainer extends Component {

  render() {
    const { cars } = this.props;

    return(
      <section className="list-wrapper">
        <ModalMap />
        {cars.map((car, index) => (
          <Card 
            key={`cards-${index}`}
            {...car}
          />
        ))}
      </section>
    );
  }
};

const mapStateToProps = ({ taxi }) => ({
  cars: taxi.cars
});

export default connect(mapStateToProps, null)(ListContainer);
