import React from 'react';

const Dropdown = ({ children }) => (
    <li className="nav-item dropdown">
        <button type="button" id="account-dropdown" className="nav-btn btn dropdown-toggle" aria-haspopup="true" aria-expanded="false">
            Dropdown
        </button>
        <div className="dropdown-menu dropdown-menu-right show" aria-labelledby="account-dropdown">
            {children}
        </div>
    </li>
);

export default Dropdown;
