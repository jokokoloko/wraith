import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form'
import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

function CompositionMeta(props) {
    const { register, handleSubmit, watch, errors } = useForm()

    return (
        <form id="form-composition" className={`form form-lg`} onSubmit={handleSubmit((data) => console.log(data))}>
            <div className="form-panel">
                <div className='form-group'>
                    <input name="title" placeholder="Title" ref={register} className="form-control form-control-lg"/>
                </div>
                <div className='form-group'>
                    <textarea name="strategy" placeholder="Strategy" ref={register} className="form-control form-control-lg"/>
                </div>
            </div>
            <div className="form-panel">
                <h3 className="form-title section-title">Picks</h3>
                <div className='form-group'>
                    <input
                        type="area"
                        name="general"
                        placeholder="General"
                        className="form-control form-control-lg"
                    />
                </div>

                <div className='form-group'>

                    <Tabs>
                        <TabList>
                            <Tab className='react-tabs__tab tab-customized-deselected' selectedClassName='react-tabs__tab--selected tab-customized-selected'>Top</Tab>
                            <Tab className='react-tabs__tab tab-customized-deselected' selectedClassName='react-tabs__tab--selected tab-customized-selected'>Jungle</Tab>
                            <Tab className='react-tabs__tab tab-customized-deselected' selectedClassName='react-tabs__tab--selected tab-customized-selected'>Middle</Tab>
                            <Tab className='react-tabs__tab tab-customized-deselected' selectedClassName='react-tabs__tab--selected tab-customized-selected'>Bottom</Tab>
                            <Tab className='react-tabs__tab tab-customized-deselected' selectedClassName='react-tabs__tab--selected tab-customized-selected'>Support</Tab>
                        </TabList>
                        <TabPanel>Top</TabPanel>
                        <TabPanel>Jungle</TabPanel>
                        <TabPanel>Middle</TabPanel>
                        <TabPanel>Bottom</TabPanel>
                        <TabPanel>Support</TabPanel>
                    </Tabs>
                </div>


            </div>

        </form>
    )
}


CompositionMeta.propTypes = {
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    formNotePicks: PropTypes.objectOf(PropTypes.any).isRequired,
    formNoteBans: PropTypes.objectOf(PropTypes.any).isRequired,
    formStrategies: PropTypes.arrayOf(PropTypes.any).isRequired,
    addStrategy: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CompositionMeta;
