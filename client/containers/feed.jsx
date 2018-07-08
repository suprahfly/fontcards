import React, { Component, Fragment } from "react";
import Card from "../components/card/card";
import data from "../../parsed-google.json";

export default class Feed extends Component {
    state = {
        activeCard: null
    };

    setActive = id => {
        console.debug(id);
        this.setState({
            activeCard: id
        });
    };

    render() {
        return (
            <div className={this.props.className}>
                {data
                    .slice(0, 20)
                    .map((props, i) => (
                        <Card
                            {...props}
                            activeCard={this.state.activeCard}
                            setActive={this.setActive}
                            key={`card-${i}`}
                        />
                    ))}
            </div>
        );
    }
}
