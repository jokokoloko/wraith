import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findByString, removeStatus } from './filter';
import { COMPOSITION_SAVE_REQUEST, VIEW_LOAD_REQUEST } from './redux/type';

const LoadingContext = React.createContext([{}, () => {}]);

const InternalLoadingContextProvider = ({ loading, submitting, children }) => (
    <LoadingContext.Provider
        value={{
            loading,
            submitting,
        }}
    >
        {children}
    </LoadingContext.Provider>
);
InternalLoadingContextProvider.propTypes = {
    children: PropTypes.node,
};

function mapStateToProps({ calls }) {
    return {
        loadingView: findByString(calls, removeStatus(VIEW_LOAD_REQUEST)),
        submitting: findByString(calls, removeStatus(COMPOSITION_SAVE_REQUEST)),
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

const LoadingContextProvider = connect(mapStateToProps, mapDispatchToProps)(InternalLoadingContextProvider);
export { LoadingContext, LoadingContextProvider };
