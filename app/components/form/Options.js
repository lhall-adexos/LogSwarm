import React from 'react';

export default class Options extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            required: (props.required),
        };

        this.refSelectIndex = this.refSelectIndex.bind(this);
    }

    handleChange(event){
        //Call onChange method on the parent component for updating it's state
        //If saving this field for final form submission, it gets passed
        // up to the top component for sending to the server
        if(this.props.onChange) {
            this.props.onChange(event);
        }
    }

    refSelectIndex(sel) {
        this.select = sel;
    }

    getSelectedIndex() {
        if (this.select) {
            return this.select.selectedIndex;
        }
    }

    render() {
        if (this.props.items.length > 0) {
            const items = this.props.items.map((item, i) => {
                console.log(item)
                const key = `option-${item.id}`;
                return (
                    <option key={key} value={item.id}>{item.label}</option>
                );
            });

            return (
                <select className="form-control"
                        ref={this.refSelectIndex}
                        name={this.props.uniqueName}
                        onChange={(e) => this.handleChange(e)}>
                    {items}
                </select>
            );
        }

        return (
            <span/>
        );
    }
}

Options.defaultProps = {
    items: []
};

Options.propTypes = {
    items: React.PropTypes.array
};