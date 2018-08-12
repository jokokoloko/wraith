import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ className, position, source, alternate }) => <img className={`${className} ${position} img-fluid`} src={source} alt={alternate} />;

Image.propTypes = {
    className: PropTypes.string,
    position: PropTypes.string,
    source: PropTypes.string,
    alternate: PropTypes.string,
};

Image.defaultProps = {
    className: 'no-class',
    position: 'no-position',
    source: undefined,
    alternate: undefined,
};

export default Image;
