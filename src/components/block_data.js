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
                <div>
                    <div>{this.props.title}</div>
                    <div><textarea rows="5" columns="50" 
                        onChange={this.handleChange}></textarea></div>
                </div>
            </div>
        );        
    }

};

export default BlockData;
