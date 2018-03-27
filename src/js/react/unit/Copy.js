import React from 'react';
import PropTypes from 'prop-types';

const Copy = ({ element: Element, title, description }) => (
    <div className="copy unit">
        {title && <Element className="title">{title}</Element>}
        {description && <p className="description">{description}</p>}
    </div>
);

Copy.propTypes = {
    element: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
};

Copy.defaultProps = {
    element: 'h2',
    title: undefined,
    description: undefined,
};

export default Copy;
