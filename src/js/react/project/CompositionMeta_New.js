import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { Tabs, TabPanel, TabList, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import capitalize from 'capitalize';
import Cell from './Cell';

function InputNote({ lane, field, register }) {
    return (
        <input
            type="area"
            name={field}
            placeholder={`Notes on the ${capitalize(lane)} pick`}
            className="form-control form-control-lg"
            ref={register}
        />
    );
}

InputNote.propTypes = {
    lane: PropTypes.string,
    field: PropTypes.string,
    register: PropTypes.func,
};

function CompositionMeta({ onChange }) {
    const { control, register, handleSubmit, watch, errors } = useForm();
    const { fields: pickFields } = useFieldArray({ control, name: 'formNotePicks.lanes' });
    const { fields: banFields } = useFieldArray({ control, name: 'formNoteBans.lanes' });
    const { fields: strategyFields, append, remove } = useFieldArray({ control, name: 'formStrategies' });

    const appendStrategy = useCallback(() => append({}), [append]);

    return (
        <form id="form-composition" className={`form form-lg`} onSubmit={handleSubmit((data) => console.log(data))}>
            <div className="form-panel">
                <div className="form-group">
                    <input name="title" placeholder="Title" ref={register} className="form-control form-control-lg" />
                </div>
                <div className="form-group">
                    <textarea name="strategy" placeholder="Strategy" ref={register} className="form-control form-control-lg" />
                </div>
            </div>
            <div className="form-panel">
                <h3 className="form-title section-title">Picks</h3>
                <div className="form-group">
                    <input
                        type="area"
                        name="formNotePicks.general"
                        placeholder="General reason for picks"
                        className="form-control form-control-lg"
                        ref={register}
                    />
                </div>

                <div className={`form-group zero-border`}>
                    <Tabs>
                        <TabList className="react-tabs__tab-list react-tabs__tab-list-customized">
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Top
                            </Tab>
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Jungle
                            </Tab>
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Middle
                            </Tab>
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Bottom
                            </Tab>
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Support
                            </Tab>
                        </TabList>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNotePicks.lanes[0]" lane="top" register={register} />
                        </TabPanel>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNotePicks.lanes[1]" lane="jungle" register={register} />
                        </TabPanel>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNotePicks.lanes[2]" lane="middle" register={register} />
                        </TabPanel>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNotePicks.lanes[3]" lane="bottom" register={register} />
                        </TabPanel>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNotePicks.lanes[4]" lane="support" register={register} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            <div className="form-panel">
                <h3 className="form-title section-title">Bans</h3>
                <div className="form-group">
                    <input
                        type="area"
                        name="formNoteBans.general"
                        placeholder="General reason for bans"
                        className="form-control form-control-lg"
                        ref={register}
                    />
                </div>

                <div className={`form-group zero-border`}>
                    <Tabs>
                        <TabList className="react-tabs__tab-list react-tabs__tab-list-customized">
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Top
                            </Tab>
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Jungle
                            </Tab>
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Middle
                            </Tab>
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Bottom
                            </Tab>
                            <Tab
                                className="react-tabs__tab tab-customized-deselected"
                                selectedClassName="react-tabs__tab--selected tab-customized-selected"
                            >
                                Support
                            </Tab>
                        </TabList>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNoteBans.lanes[0]" lane="top" register={register} />
                        </TabPanel>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNoteBans.lanes[1]" lane="jungle" register={register} />
                        </TabPanel>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNoteBans.lanes[2]" lane="middle" register={register} />
                        </TabPanel>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNoteBans.lanes[3]" lane="bottom" register={register} />
                        </TabPanel>
                        <TabPanel className="react-tabs__tab-panel react-tabs__tab-panel-customized">
                            <InputNote field="formNoteBans.lanes[4]" lane="support" register={register} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            <div className="form-panel">
                <h3 className="form-title section-title">Strategies</h3>

                {strategyFields.map((field, index) => (
                    <div key={field.id} className="form-node">
                        <div className="form-group">
                            <input
                                name={`formStrategies[${index}].phase`}
                                placeholder="Phase"
                                ref={register}
                                className="form-control form-control-lg"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name={`formStrategies[${index}].strategy`}
                                placeholder="Strategy description"
                                ref={register}
                                className="form-control form-control-lg"
                            />
                        </div>
                    </div>
                ))}
                <div className="form-action text-center">
                    <button type="button" className="btn btn-add-group btn-main " onClick={appendStrategy}>
                        <div className="first">
                            <div className="second">
                                <div className="third">
                                    <div className="fourth">+ Phase</div>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
    );
}

CompositionMeta.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default CompositionMeta;
