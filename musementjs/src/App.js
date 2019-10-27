import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path='/page:page' component={Home}></Route>
            <Route path='/' component={Home}></Route>
          </Switch>
        </Router>
      
    </div>
  );
}

export default App;
