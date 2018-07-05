import React, { Component, createRef } from 'react';
import InputButton from '../input/InputButton';
import InputText from '../input/InputText';

class FormPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            error: {},
        };
        this.isFocus = createRef();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const form = {
            ...this.state.form,
            ...this.props.post,
        };
        this.setState({
            form,
        });
        !form.title && this.isFocus.current.focus();
    }
    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        const group = target.dataset.group;
        const form = group
            ? {
                  ...this.state.form,
                  [group]: {
                      ...this.state.form[group],
                      [field]: value,
                  },
              }
            : {
                  ...this.state.form,
                  [field]: value,
              };
        this.setState({
            form,
        });
    }
    onSubmit(event) {
        event.preventDefault();
    }
    render() {
        const size = 'lg';
        const { form, error } = this.state;
        return (
            <form id="form-post" className={`form form-${size}`} onSubmit={this.onSubmit}>
                <div className="row gutter-lg-80">
                    <div className="col-lg-9">
                        <InputText
                            name="title"
                            label="Title"
                            placeholder="Title"
                            size={size}
                            onChange={this.onChange}
                            value={form.title}
                            error={error.title}
                            reference={this.isFocus}
                        />
                    </div>

                    <div className="col-lg-3">
                        <div className="card card-panel">
                            <div className="card-body">
                                <h2 className="card-headline">{form.title || 'Title'}</h2>
                                <InputButton
                                    type="submit"
                                    name="save"
                                    label={false ? 'Publishing...' : 'Publish'}
                                    kind="success"
                                    size={size}
                                    display="block"
                                    disabled={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default FormPost;
