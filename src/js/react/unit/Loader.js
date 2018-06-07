import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frame: 1,
        };
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                frame: this.state.frame + 1,
            });
        }, this.props.interval);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        const { amount, position, label, error } = this.props;
        const { frame } = this.state;
        let text = '';
        if (error) {
            text = 'x';
            clearInterval(this.interval);
        } else {
            let dots = frame % (amount + 1);
            while (dots > 0) {
                text += '.';
                dots -= 1;
            }
        }
        return <div className={`loader loader-${label ? 'label' : 'default'} ${position}`}>{label ? `${label}${text}` : text}</div>;
    }
}

Loader.propTypes = {
    position: PropTypes.string,
    label: PropTypes.string,
    interval: PropTypes.number,
    amount: PropTypes.number,
    error: PropTypes.bool,
};

Loader.defaultProps = {
    position: 'no-position',
    label: undefined,
    interval: 300,
    amount: 3,
    error: false,
};

export default Loader;
