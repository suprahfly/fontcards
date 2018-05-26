import React, { Component, Fragment } from "react";
import Card from "../components/card/card";
import data from "../../parsed-google.json";

export default class Feed extends Component {
    render() {
        return (
            <div className={this.props.className}>
                {data
                    .slice(20)
                    .map((props, i) => <Card {...props} key={`card-${i}`} />)}
            </div>
        );
    }
}
