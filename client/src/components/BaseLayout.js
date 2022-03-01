import React, { Component } from "react";
import Menu from "./Menu";


class BaseLayout extends Component {
    render() {
        return (
            <div>
                <Menu />
                {this.props.children}
                <h6>Footer</h6>
            </div>
        )
    }
}

export default BaseLayout