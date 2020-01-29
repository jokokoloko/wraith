import React from 'react';
import { AccountContextProvider } from './account-context';
import { LoadingContextProvider } from './loading-context';
import { LegacyRandomContextProvider } from './legacy-random-context';

const RootContext = ({ children }) => {
    return (
        <AccountContextProvider>
            <LoadingContextProvider>
                <LegacyRandomContextProvider>{children}</LegacyRandomContextProvider>
            </LoadingContextProvider>
        </AccountContextProvider>
    );
};

export default RootContext;
