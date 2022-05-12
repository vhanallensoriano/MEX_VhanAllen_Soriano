import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Home from './Home';
import DeleteConfirm from './DeleteConfirm';
import DoneConfirm from './DoneConfirm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddTodo from './AddTodo';
import NotFound from './NotFound';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <App />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="/AddTodo">
              <AddTodo />
            </Route>
            <Route path="/DeleteConfirm/:id">
              <DeleteConfirm />
            </Route>
            <Route path="/DoneConfirm/:id">
              <DoneConfirm />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

