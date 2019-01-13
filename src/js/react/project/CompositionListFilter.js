import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../input/InputText';
import { sortBy } from 'lodash';
import { positions } from '../../utilities';

const CompositionListFilter = ({ championsMap, filterChamps, apply }) => {
    const sortedChamps = sortBy(championsMap, ['name']);
    const champOptions = sortedChamps.map((cur) => {
        return (
            <option key={cur.key} value={cur.id}>{cur.name}</option>
        );
    });
    const loopTest = positions.map((position, idx) => {
        return (
            <div className="col" key={`filter-${position}`}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor={`inputGroupSelect-${idx}`}>{position}</label>
                    </div>
                    <select className="custom-select"
                        id={`inputGroupSelect-${idx}`}
                        onChange={(e) => filterChamps(position, e.target.value)}>
                        <option defaultValue="none" value="none">Choose...</option>
                        {champOptions}
                    </select>
                </div>
            </div>
        );
    });
    return (
        <section className="basic block height-auto align-left">
            <div className="container p-3">
                <div className="row my-3">
                    <div className="col-4">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Sort By</label>
                            </div>
                            <select className="custom-select" id="inputGroupSelect01">
                                <option defaultValue="Newest">Newest</option>
                                <option value="Popular">Popular</option>
                                <option value="Featured">Featured</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-8">
                        hello there!
                    </div>
                </div>
                <div className="row my-3">
                    {loopTest}
                </div>
                <div className="row">
                    <button type="button" className="btn btn-success" onClick={apply}>Apply</button>
                </div>
            </div>
        </section>
    );
};

CompositionListFilter.propTypes = {
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    filterChamps: PropTypes.func.isRequired,
    apply: PropTypes.func.isRequired,
};

export default CompositionListFilter;
