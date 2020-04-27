import React, { Component } from 'react';

import './add-item.css';

export default class AddItem extends Component {

    constructor() {
        super();

        this.state = {
            label: ''
        };

        this.onLabelChange = ( event ) => {
            this.setState({
                label: event.target.value
            })
        };

        this.onSubmit = ( event ) => {
            event.preventDefault();
            this.props.onAddedItem(this.state.label);
            this.setState({
                label: ''
            })
        };
    }

    render() {

        return (
            <form
                className="d-flex add-item"
                onSubmit={ this.onSubmit }>
                <input type="text"
                    className="form-control"
                    placeholder="type the text"
                    onChange={ this.onLabelChange }
                    value={ this.state.label } />
                <button
                    className="btn btn-info"
                    > Add Item
                </button>
            </form>
        );
    }
};