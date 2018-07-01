import React, { Component, Fragment, createRef } from 'react';
import InputText from '../input/InputText';

class FormTeamComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                description: '',
            },
        };
    }

    componentDidMount() {}

    render() {
        const size = 'lg';
        const { form } = this.state;
        return (
            <form className={`form form-${size} mx-lg-auto`}>
                <div className="form-row form-gutter-20">
                    <InputText name="title" label="Comp Name" placeholder="Comp Name" value={form.title} size={size} />
                </div>
                <div className="form-row form-gutter-20">
                    <InputText
                        type="area"
                        name="description"
                        label="description"
                        placeholder="How does this comp win?"
                        value={form.description}
                        size={size}
                    />
                </div>
            </form>
        );
    }
}

export default FormTeamComp;
