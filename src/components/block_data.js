import React, { Component } from 'react';

class BlockData extends Component {

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt){
        this.props.onChange(evt.target.value);
    }

    render(){
        return (
            <div>
                <div>{this.props.title}</div>
                <div><textarea className="form-control" rows="5" 
                    onChange={this.handleChange}></textarea></div>
            </div>
        );        
    }

};

export default BlockData;
