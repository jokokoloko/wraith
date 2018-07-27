import React from 'react';
import InputText from '../input/InputText';

const ChampionFilter = ({ roles, filters, filterRole, onFiltersChange }) => {
    const size = 'sm';
    const loopRole = roles.map((role) => {
        const selectedClass = filters.role === role ? 'selected' : '';
        return <li key={role} className={`role-icon bg-${role.toLowerCase()}-icon ${selectedClass}`} onClick={() => filterRole(role)} />;
    });
    return (
        <form id="form-filter-champion" className={`form form-${size}`}>
            <div className="row">
                <div className="col">
                    <ul className="role d-flex">{loopRole}</ul>
                </div>
                <div className="col">
                    <InputText
                        name="champion-name"
                        label="Champion Name"
                        placeholder="Filter by name..."
                        onChange={onFiltersChange}
                        value={filters.name}
                        size={size}
                    />
                </div>
            </div>
        </form>
    );
};

export default ChampionFilter;
