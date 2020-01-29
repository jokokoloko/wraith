import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AccountContext = React.createContext([{}, () => {}]);

const InternalAccountContextProvider = ({ account, children }) => (
    <AccountContext.Provider
        value={{
            account,
            authenticated: account.authenticated,
        }}
    >
        {children}
    </AccountContext.Provider>
);
InternalAccountContextProvider.propTypes = {
    children: PropTypes.node,
};

function mapStateToProps({ account }) {
    return {
        account,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

const AccountContextProvider = connect(mapStateToProps, mapDispatchToProps)(InternalAccountContextProvider);
export { AccountContext, AccountContextProvider };
