import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../input/InputText';

const ChampionFilter = ({ roles, filters, filterRole, filterName }) => {
    const size = 'md';
    const loopRole = roles.map((role) => {
        const selectedClass = filters.role === role ? 'selected' : '';
        return <li key={role} className={`role-icon bg-${role.toLowerCase()}-icon ${selectedClass}`} onClick={() => filterRole(role)} />;
    });
    return (
        <form id="form-filter-champion" className={`form form-${size}`}>
            <div className="row">
                <div className="col">
                    <ul className="role list-reset d-flex justify-content-between">{loopRole}</ul>
                </div>
                <div className="col">
                    <InputText
                        name="filter-by-name"
                        label="Filter by name"
                        placeholder="Filter by champion name..."
                        onChange={filterName}
                        value={filters.name}
                        size={size}
                    />
                </div>
            </div>
        </form>
    );
};

ChampionFilter.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    filters: PropTypes.objectOf(PropTypes.any).isRequired,
    filterRole: PropTypes.func.isRequired,
    filterName: PropTypes.func.isRequired,
};

export default ChampionFilter;
