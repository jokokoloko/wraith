import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

const Avatar = ({ position, source, alternate, shape }) => (
    <figure className={`avatar ${source ? 'image' : 'empty'} ${shape}`}>
        {source && <Image position={position} source={source} alternate={alternate} />}
    </figure>
);

Avatar.propTypes = {
    position: PropTypes.string,
    source: PropTypes.string,
    alternate: PropTypes.string,
    shape: PropTypes.string,
};

Avatar.defaultProps = {
    position: 'no-position',
    source: undefined,
    alternate: undefined,
    shape: 'square',
};

export default Avatar;
