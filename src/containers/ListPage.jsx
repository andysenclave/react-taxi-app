import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalMap from '../components/ModalMap/modalMap.jsx';
import Card from '../components/Card/card.jsx';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalCarInfo: []
    };
    this.updateModalCar = this.updateModalCar.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  updateModalCar(car) {
    this.setState({ 
      showModal: true,
      modalCarInfo: [car]
    });
  }

  closeModal(status) {
    if(status) {
      this.setState({ showModal: false });
    }
  }

  render() {
    const { cars } = this.props;
    const { showModal, modalCarInfo } = this.state;

    return(
      <section className="list-wrapper">
        <ModalMap 
          carInfo={modalCarInfo}
          showModal={showModal} 
          closeModal={(status) => this.closeModal(status)}
        />
        {cars.map((car, index) => (
          <Card 
            key={`cards-${index}`}
            onClick={() => this.updateModalCar(car)}
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
