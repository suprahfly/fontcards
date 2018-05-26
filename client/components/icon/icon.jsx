import React, { Component } from "react";
import * as assets from "../../assets";

const Icon = ({ name }) => (
    <i>
        <img src={assets[name]} />
    </i>
);

export default Icon;
