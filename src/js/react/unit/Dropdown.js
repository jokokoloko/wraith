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
        const { name, label, alignment, children } = this.props;
        const { toggle } = this.state;
        return (
            <li className={`nav-item dropdown ${toggle ? `show` : `hide`}`}>
                <button
                    type="button"
                    id={`${name}-dropdown`}
                    className="nav-btn btn dropdown-toggle"
                    aria-haspopup="true"
                    aria-expanded={toggle ? true : false}
                    onClick={this.onClick}>
                    {label}
                </button>
                <div className={`dropdown-menu dropdown-menu-${alignment} ${toggle ? `show` : `hide`}`} aria-labelledby={`${name}-dropdown`}>
                    {children}
                </div>
            </li>
        );
    }
}

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    alignment: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Dropdown.defaultProps = {
    label: 'Dropdown',
    alignment: 'left',
};

export default Dropdown;
