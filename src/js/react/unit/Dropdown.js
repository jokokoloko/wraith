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
        const { name, label, alignment, caret, children } = this.props;
        const { toggle } = this.state;
        return (
            <li className={`nav-item dropdown ${toggle ? `show` : `hide`}`}>
                <button
                    type="button"
                    id={`${name}-dropdown`}
                    className={`nav-btn btn dropdown-toggle ${caret ? 'caret' : 'no-caret'}`}
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
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    alignment: PropTypes.string,
    caret: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Dropdown.defaultProps = {
    label: 'Dropdown',
    alignment: 'left',
    caret: false,
};

export default Dropdown;
