import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './../component/home/Home.js';
import AddForm from './../component/addform/AddForm.js';
import './css/index.css';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="root"></div>';
  return element;
}

let element = component(); 
document.body.appendChild(element);

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
          <div>
            <Switch>
              <Route path='/' component = { Home } />
              {/* <Route path='/addform' component = { AddForm } /> */}
            </Switch>
          </div>
        </Router>
    );
  }
}

ReactDOM.render(<Index/>,document.getElementById('root'));