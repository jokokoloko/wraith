import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: false,
        };
    }
    componentDidMount() {
        const image = document.createElement('img');
        image.src = this.props.source;
        image.onload = () => {
            this.setState({
                loaded: true,
                error: false,
            });
            this.props.onLoad && this.props.onLoad(image);
        };
        image.onerror = (error) => {
            this.setState({
                loaded: false,
                error: true,
            });
            this.props.onError && this.props.onError(error);
        };
    }
    render() {
        const { loaded, error } = this.state;
        const { position, source, alternate } = this.props;
        return loaded === false ? (
            <Loader position="exact-center" error={error} />
        ) : (
            <img className={`img-fluid ${position}`} src={source} alt={alternate} />
        );
    }
}

Image.propTypes = {
    position: PropTypes.string,
    source: PropTypes.string,
    alternate: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
};

Image.defaultProps = {
    position: 'no-position',
    source: undefined,
    alternate: undefined,
    onLoad: undefined,
    onError: undefined,
};

export default Image;
