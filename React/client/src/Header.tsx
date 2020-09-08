import React, { Component, ChangeEvent } from "react";

type HeaderState = {
    inputVal: string;
};

export class Header extends Component {
    state: HeaderState = {
        inputVal: "",
    };

    render() {
        return <h1>Welcome To The TODO List!</h1>;
    }
}

export default Header;
