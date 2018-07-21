import React, { Component } from 'react';
import InputText from '../input/InputText';

const ChampionSelectFilters = ({ roles, filters, filterRole, onFiltersChange }) => {
    const size = 'sm';
    const roleList = roles.map((role) => {
        const selectedClass = filters.role === role ? 'selected' : '';
        return <div key={role} className={`role-icon bg-${role.toLowerCase()}-icon ${selectedClass}`} onClick={() => filterRole(role)} />;
    });
    return (
        <div className="container filters-bar">
            <div className="row">
                <div className="col-6">{roleList}</div>
                <div className="col-6">
                    <InputText
                        name="title"
                        label="Champion Name"
                        placeholder="Champion Name"
                        onChange={onFiltersChange}
                        value={filters.name}
                        size={size}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChampionSelectFilters;
