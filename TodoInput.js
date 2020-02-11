import React, { Component } from 'react';

export default class TodoInput extends Component {
    render() {
        const { item, handleChange, handleSubmit, addItemBtnBlur } = this.props;
        return (
        <div className="card card-body my-3">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" className="form-control text-capitalize" placeholder="add a todo item" value={item} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-block btn-primary mt-3 text-capitalize" onClick={handleSubmit} disabled={addItemBtnBlur}>add item</button>
            </form>
        </div>
        );
    }
}
