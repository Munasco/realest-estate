import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './hocs/Layout';
import './sass/main.scss';
import {Provider} from 'react-redux'
import store from './store';
import PrivateRoute from './components/PrivateRoute';


const loading = () => <div className="App-header">Loading...</div>;

// Containers
const Home = React.lazy(() => import('./containers/Home'));
const About = React.lazy(() => import('./containers/About'));
const Signin = React.lazy(() => import('./containers/Signin'));
const Signup = React.lazy(() => import('./containers/Signup'));
const Listings = React.lazy(() => import('./containers/Listings'));
const ListingDetail = React.lazy(() => import('./containers/ListingDetail'));
const Contact = React.lazy(() => import('./containers/Contact'));
const NotFound = React.lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/listings' component={Listings} />
              <PrivateRoute exact path='/listings/:id' component={ListingDetail} />
              <Route exact path='/login' component={Signin} />
              <Route exact path='/signup' component={Signup} />
              <Route component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </React.Suspense>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
