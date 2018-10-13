import React from 'react';
import PropTypes from 'prop-types';

const Pager = ({ previous, next }) => {
    // const size = 'md';
    return (
        <nav aria-label="navigation">
            <ul className="pagination justify-content-center pager">
                <li className="page-item">
                    <a className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

// Pager.propTypes = {
//     roles: PropTypes.arrayOf(PropTypes.string).isRequired,
//     filters: PropTypes.objectOf(PropTypes.any).isRequired,
//     filterRole: PropTypes.func.isRequired,
//     filterName: PropTypes.func.isRequired,
// };

export default Pager;
