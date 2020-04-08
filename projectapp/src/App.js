import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from './Pages/Main';
import Detail from './Pages/Detail';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">      
        <Switch>
            <Route path="/" component={Main} exact/>
            <Route path="/detail/:id" component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
