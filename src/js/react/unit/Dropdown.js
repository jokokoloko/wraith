import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.setState((prevState) => ({
            toggle: !prevState.toggle,
        }));
    }
    render() {
        const { label, children } = this.props;
        const { toggle } = this.state;
        return (
            <li className={`nav-item dropdown ${toggle ? `show` : `hide`}`}>
                <button
                    type="button"
                    id="account-dropdown"
                    className="nav-btn btn dropdown-toggle"
                    aria-haspopup="true"
                    aria-expanded={toggle ? true : false}
                    onClick={this.onClick}>
                    {label}
                </button>
                <div className={`dropdown-menu dropdown-menu-right ${toggle ? `show` : `hide`}`} aria-labelledby="account-dropdown">
                    {children}
                </div>
            </li>
        );
    }
}

Dropdown.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Dropdown.defaultProps = {
    label: 'Dropdown',
};

export default Dropdown;
