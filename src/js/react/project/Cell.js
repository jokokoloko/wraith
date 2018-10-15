import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ children }) => (
    <div className="cell">
        <div className="membrane">
            <div className="nucleus">{children}</div>
        </div>
    </div>
);

Cell.propTypes = {
    children: PropTypes.node,
};

Cell.defaultProps = {
    children: undefined,
};

export default Cell;
