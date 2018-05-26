import React, { Component } from "react";
import { render } from "react-dom";
import classnames from "classnames";
import Header from "./components/header/header";
import Feed from "./containers/feed";
import css from "./app.css";

class App extends Component {
    render() {
        return (
            <main className={css.cont}>
                <Header />
                <Feed className={css.feed} />
            </main>
        );
    }
}

const node = document.querySelector("#fontcards-app");
render(<App />, node);
