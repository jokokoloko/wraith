import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Contact = ({ className, item }) => (
    <address className={`contact ${className}`} itemType="http://schema.org/Organization" itemScope>
        <p className="address" itemProp="address" itemType="http://schema.org/PostalAddress" itemScope>
            {item.address && item.address.city && item.address.state && item.address.country ? (
                <Fragment>
                    <span itemProp="addressLocality">{item.address.city}</span>
                    {', '}
                    <span itemProp="addressRegion">{item.address.state}</span>
                    {', '}
                    <span itemProp="addressCountry">{item.address.country}</span>
                </Fragment>
            ) : item.address && item.address.city && item.address.state ? (
                <Fragment>
                    <span itemProp="addressLocality">{item.address.city}</span>
                    {', '}
                    <span itemProp="addressRegion">{item.address.state}</span>
                </Fragment>
            ) : item.address && item.address.city && item.address.country ? (
                <Fragment>
                    <span itemProp="addressLocality">{item.address.city}</span>
                    {', '}
                    <span itemProp="addressCountry">{item.address.country}</span>
                </Fragment>
            ) : item.address && item.address.state && item.address.country ? (
                <Fragment>
                    <span itemProp="addressRegion">{item.address.state}</span>
                    {', '}
                    <span itemProp="addressCountry">{item.address.country}</span>
                </Fragment>
            ) : item.address && item.address.city ? (
                <span itemProp="addressLocality">{item.address.city}</span>
            ) : item.address && item.address.state ? (
                <span itemProp="addressRegion">{item.address.state}</span>
            ) : item.address && item.address.country ? (
                <span itemProp="addressCountry">{item.address.country}</span>
            ) : (
                'Location'
            )}
        </p>
    </address>
);

Contact.propTypes = {
    className: PropTypes.string,
    item: PropTypes.objectOf(PropTypes.any).isRequired,
};

Contact.defaultProps = {
    className: 'contact-default',
};

export default Contact;
