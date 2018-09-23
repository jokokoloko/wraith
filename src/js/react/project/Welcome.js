import React from 'react';
import Image from '../unit/Image';

const Welcome = ({ title, description, image }) => (
    <div className="welcome">
        <Image source={image} alternate={title} />
        <h1 className="title">{title}</h1>
        <h2 className="description">{description}</h2>
    </div>
);

export default Welcome;
