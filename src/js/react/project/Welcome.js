import React from 'react';
import PropTypes from 'prop-types';
import Image from '../unit/Image';

const Welcome = ({ title, description, image }) => (
    <div className="welcome">
        <Image source={image} alternate={title} />
        <h1 className="title">{title}</h1>
        <h2 className="description">{description}</h2>
    </div>
);

Welcome.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
};

export default Welcome;
