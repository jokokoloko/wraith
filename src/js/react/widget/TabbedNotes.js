import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../project/Cell';
import InputText from '../input/InputText';

class TabbedNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: '',
        };
        this.selectTab = this.selectTab.bind(this);
    }
    componentDidMount() {
        const { tabTitles } = this.props;
        this.selectTab(tabTitles[0]);
    }
    selectTab(tab) {
        this.setState({
            currentTab: tab,
        });
    }
    render() {
        const { formObject, formName, formGroup, tabTitles, onInputChange } = this.props;
        let { currentTab } = this.state;
        const size = 'lg';
        const buttonGroup = tabTitles.map((tab, index) => {
            const active = currentTab === tab;
            return (
                <button key={`btn-${index}`} type="button" className={`btn btn-tab ${active ? 'active' : ''}`} onClick={() => this.selectTab(tab)}>
                    <Cell>
                        <div className="exact-center">{tab}</div>
                    </Cell>
                </button>
            );
        });
        return (
            <div className="form-node">
                <div className="form-action d-flex justify-content-between">{buttonGroup}</div>
                <InputText
                    type="area"
                    name={currentTab}
                    label={currentTab}
                    placeholder={`Note for ${currentTab}`}
                    group={formGroup}
                    size={size}
                    onChange={(e) => onInputChange(e, formName)}
                    value={formObject[formGroup][currentTab]}
                />
            </div>
        );
    }
}

TabbedNotes.propTypes = {
    formObject: PropTypes.objectOf(PropTypes.any).isRequired,
    formName: PropTypes.string.isRequired,
    formGroup: PropTypes.string.isRequired,
    tabTitles: PropTypes.arrayOf(PropTypes.any).isRequired,
    onInputChange: PropTypes.func.isRequired,
};

export default TabbedNotes;
