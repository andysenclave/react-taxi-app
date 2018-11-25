import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import FilterWidgets from './components/FilterWidget/filter';
import ListPage from './containers/ListPage';
import MapPage from './containers/MapPage';
import { fetchTaxiData } from './store/actions/taxi';
import Ripple from './assets/loader';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.clickLinkHandler = this.clickLinkHandler.bind(this);
  }

  componentDidMount() {
    if(!this.props.taxiDataLoadStarted) {
      this.props.loadTaxiData();
    }
  }

  clickLinkHandler(event) {
    const { currentTarget, target } = event;
    if(event.target.tagName !== 'ASIDE') {
      const childElements = [...currentTarget.children];
      childElements.map((item, index) => {
        if(item.className.indexOf('selected') > -1) {
          currentTarget.children[index].className = 
            currentTarget.children[index].className.replace('selected', '');
        }
        return item;
      });
      target.className = `${target.className} selected`;
    }
  }

  render() {
    const { pathname } = this.props.location;
    const linkClass = pathname === '/' ? 'selected' : '';
    const mapClass = linkClass === 'selected' ? '' : 'selected';
    const { taxiDataLoadPending } = this.props;

    return (
      <div className="app">
        <aside className='navigation-bar' onClick={(event) => this.clickLinkHandler(event)}>
          <Link to='/' className={`list-link ${linkClass}`}>
            List
          </Link>
          <Link to='/map' className={`map-link ${mapClass}`}>
            Map
          </Link>
        </aside>
        { taxiDataLoadPending ? (
          <img src={Ripple} alt="loader" className='loader' />
        ) : (
          <main className='wrapper'>
            <header className='filter-container'>
              <FilterWidgets />
            </header>
            <section className='page-container'>
              <Switch>
                <Route exact path='/' component={ListPage} />
                <Route exact path='/map' component={MapPage} />
              </Switch>
            </section>
          </main>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ taxi }) => ({
  taxiDataLoadStarted: taxi.fetchStarted,
  taxiDataLoadPending: taxi.fetchPending
});

const mapDispatchToProps = dispatch => ({
  loadTaxiData: () => dispatch(fetchTaxiData())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
