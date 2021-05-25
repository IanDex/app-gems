import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Piedra} from "./components/create/piedra";
import {QR} from "./components/create/qr";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/info/:id" children={<App />} />
      <Route exact path="/" children={<Piedra />} />
      <Route exact path="/login/" children={<App />} />
      <Route exact path="/qr/" children={<QR />} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
