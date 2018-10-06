import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../input/InputText';

const CompositionListFilter = ({ championsMap }) => {
    // const size = 'md';
    const champOptions = Object.keys(championsMap).map((key) => {
        let cur = championsMap[key];
        return (
            <option key={cur.key} value={cur.id}>{cur.name}</option>
        );
    });
    const loopTest = [1,2,3,4,5].map((item, idx) => {
        return (
            <div className="col" key={`test-${item}`}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor={`inputGroupSelect-${idx}`}>Lane</label>
                    </div>
                    <select className="custom-select" id={`inputGroupSelect-${idx}`}>
                        <option defaultValue="none">Choose...</option>
                        {champOptions}
                    </select>
                </div>
            </div>
        );
    });
    return (
        <section className="basic block height-auto align-left">
            <div className="container p-3">
                <div className="row">
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
                    <div className="col-8">hello world!</div>
                </div>
                <div className="row">
                    {loopTest}
                </div>
                <div className="row">
                    <button type="button" className="btn btn-success">Apply</button>
                </div>
            </div>
        </section>
    );
};

// CompositionListFilter.propTypes = {
//     roles: PropTypes.arrayOf(PropTypes.string).isRequired,
//     filters: PropTypes.objectOf(PropTypes.any).isRequired,
//     filterRole: PropTypes.func.isRequired,
//     filterName: PropTypes.func.isRequired,
// };

export default CompositionListFilter;
