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
        const { frame } = this.state;
        const { amount, position, error } = this.props;
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
        return <div className={`loader ${position} unit`}>{text}</div>;
    }
}

Loader.propTypes = {
    position: PropTypes.string,
    interval: PropTypes.number,
    amount: PropTypes.number,
    error: PropTypes.bool,
};

Loader.defaultProps = {
    position: 'no-position',
    interval: 300,
    amount: 3,
    error: false,
};

export default Loader;
