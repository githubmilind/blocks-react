/*
** Blockchain - Concepts & Demo
** Milind Pansare
*/

import React, { Component } from 'react';

class BlockData extends Component {

    constructor(props){
        super(props);

        this.state = {
            blockData:this.props.blockData
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt){
        this.props.onChange(evt.target.value);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ blockData: nextProps.blockData })
   }    

    render(){
        return (
            <div>
                <div>{this.props.title}</div>
                <div><textarea className="form-control" rows="5" 
                    onChange={this.handleChange}
                    value={this.state.blockData} /></div>
            </div>
        );        
    }

};

export default BlockData;
