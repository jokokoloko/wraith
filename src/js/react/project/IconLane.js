import React from 'react';
import PropTypes from 'prop-types';
import iconLaneNone from '../../../img/icon-lane-none.png';
import iconLaneTop from '../../../img/icon-lane-top.png';
import iconLaneJungle from '../../../img/icon-lane-jungle.png';
import iconLaneMiddle from '../../../img/icon-lane-middle.png';
import iconLaneBottom from '../../../img/icon-lane-bottom.png';
import iconLaneSupport from '../../../img/icon-lane-support.png';
import iconLaneFill from '../../../img/icon-lane-fill.png';
import iconLaneBan from '../../../img/icon-lane-ban.png';

const IconLane = ({ className, position }) => {
    const lane = {
        none: iconLaneNone,
        top: iconLaneTop,
        jungle: iconLaneJungle,
        middle: iconLaneMiddle,
        bottom: iconLaneBottom,
        support: iconLaneSupport,
        fill: iconLaneFill,
        ban: iconLaneBan,
    };
    return <img className={`icon icon-lane img-fluid ${className}`} src={lane[position]} alt={position} />;
};

IconLane.propTypes = {
    className: PropTypes.string,
    position: PropTypes.string,
};

IconLane.defaultProps = {
    className: 'no-class',
};

export default IconLane;
