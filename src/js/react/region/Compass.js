import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { classify } from '../../function';
import * as client from '../../client';
import * as path from '../../path';

const Compass = ({ location }) => {
    let page = location.pathname;
    if (page === path.Root) {
        page = 'home';
    }
    document.body.className = `${classify(`${client.BRAND} ${page}`)}`;
    return null;
};

Compass.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Compass);
