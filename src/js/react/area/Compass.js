import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { classify } from '../../function';
import * as client from '../../client';

const Compass = ({ location }) => {
    let path = location.pathname;
    if (path === '/') {
        path = 'home';
    }
    document.body.className = `${classify(`${client.BRAND} ${path}`)}`;
    return null;
};

Compass.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Compass);
