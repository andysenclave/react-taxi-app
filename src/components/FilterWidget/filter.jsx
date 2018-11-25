import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterData } from '../../store/actions/taxi';
import './filter.css';

class FilterWidget extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event, triggerName) {
    const { currentTarget, target } = event;
    const filter = {
      [triggerName]: target.innerText
    };
    this.props.filterData(filter);
    const childElements = [...currentTarget.children];
    childElements.map((item, index) => {
      if(item.className.indexOf('selected') > -1) {
        currentTarget.children[index].className = '';
      }
      return item;
    });
    target.className = `selected`;

  }

  render() {
    return(
      <section className='filter-bar'>
        <section className='left-content'>
          <div className='filter-cabtypes' onClick={event => this.clickHandler(event, 'provider')}>
            <span className='selected'>All</span>
            <span>Car2Go</span>
            <span>MyTaxi</span>
          </div>
        </section>
        <section className='right-content'>
          <div className='filter-status' onClick={event => this.clickHandler(event, 'status')}>
            <span className='selected'>All</span>
            <span>Active</span>
            <span>Inactive</span>
          </div>
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  filterData: (filter) => dispatch(filterData(filter))
});

export default connect(null, mapDispatchToProps)(FilterWidget);
