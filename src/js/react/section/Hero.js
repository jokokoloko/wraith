import React from 'react';
import PropTypes from 'prop-types';
import Image from '../unit/Image';

const Hero = ({ container, height, align, space, tint, color, id, source, alternate, children }) => (
    <section id={id} className={`hero block height-${height} align-${align} background-${source ? 'image' : 'none'} color-${color}`}>
        {source && <Image position="fit exact-center" source={source} alternate={alternate} />}

        {children && (
            <div className={`table relative ${space} ${tint}`}>
                <div className="cell">
                    <div className="zone">
                        <div className={container}>{children}</div>
                    </div>
                </div>
            </div>
        )}
    </section>
);

Hero.propTypes = {
    container: PropTypes.string,
    height: PropTypes.string,
    align: PropTypes.string,
    space: PropTypes.string,
    tint: PropTypes.string,
    color: PropTypes.number,
    id: PropTypes.string,
    source: PropTypes.string,
    alternate: PropTypes.string,
    children: PropTypes.node,
};

Hero.defaultProps = {
    container: 'container',
    height: 'standard',
    align: 'left',
    space: 'space-xs-50',
    tint: 'tint-none',
    color: 0,
    id: undefined,
    source: undefined,
    alternate: undefined,
    children: undefined,
};

export default Hero;
