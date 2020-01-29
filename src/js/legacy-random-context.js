import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionView from './redux/action/actionView';
import * as actionComposition from './redux/action/actionComposition';
import { arrayToObject } from './function';

const LegacyRandomContext = React.createContext([{}, () => {}]);

const InternalLegacyRandomContextProvider = ({ championsMap, wildcardsMap, actionView, actionComposition, children }) => (
    <LegacyRandomContext.Provider
        value={{
            championsMap,
            wildcardsMap,
            actionView,
            actionComposition,
        }}
    >
        {children}
    </LegacyRandomContext.Provider>
);

InternalLegacyRandomContextProvider.propTypes = {
    children: PropTypes.node,
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    wildcardsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
    actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ champions, wildcards }) {
    const championsMap = arrayToObject(champions, 'id');
    const wildcardsMap = arrayToObject(wildcards, 'id');

    return { championsMap, wildcardsMap };
}

function mapDispatchToProps(dispatch) {
    return {
        actionView: bindActionCreators(actionView, dispatch),
        actionComposition: bindActionCreators(actionComposition, dispatch),
    };
}

LegacyRandomContext.propTypes = {
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    wildcardsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
    actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

const LegacyRandomContextProvider = connect(mapStateToProps, mapDispatchToProps)(InternalLegacyRandomContextProvider);
export { LegacyRandomContext, LegacyRandomContextProvider };
