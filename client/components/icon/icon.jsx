import React, { Component } from "react";
import * as assets from "../../assets/icons";

const Icon = ({ name, className }) => (
    <img className={className} src={assets[name]} />
);

export default Icon;
