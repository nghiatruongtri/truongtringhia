import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {Route, Switch} from "wouter";

import store from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Login from "./component/login";
import Register from "./component/register";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Switch>
                <Route path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route>404: No such page!</Route>
            </Switch>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
