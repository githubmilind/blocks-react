/*
** Blockchain - Concepts & Demo
** Milind Pansare
*/

import React from 'react';
import reactDOM from 'react-dom';
import BlockList from './block_list';
import * as CONSTANTS from './constants';

class BlockChain extends React.Component {

    constructor(props){
        super(props);

        var storedState = localStorage.getItem(CONSTANTS.STORAGE_KEY_BLOCKCHAIN);
        if (storedState && storedState !== "") {
            this.state = JSON.parse(storedState);
        } else {
            this.state = {
                nodes: [1, 2, 3]
            };
        }

        this.addNode = this.addNode.bind(this);
        this.resetNodes = this.resetNodes.bind(this);
    }

    storeState(){
        localStorage.setItem(CONSTANTS.STORAGE_KEY_BLOCKCHAIN, JSON.stringify(this.state));
    }

    addNode(){
        this.setState({nodes: this.state.nodes.concat(this.state.nodes[this.state.nodes.length-1]+1)});
        this.storeState();
    }

    resetNodes(){
        this.setState({nodes: [1]});      
        this.storeState();
    }

    render() {
        return (
            <div>
                <div style={{height:50, width:225}}>
                    <div style={{float:"left", width:100}}><button className="btn btn-warning" onClick={this.addNode}>Add Node</button></div> 
                    <div style={{float:"right", width:100}}><button className="btn btn-warning" onClick={this.resetNodes}>Reset Nodes</button></div> 
                </div>
                {
                    this.state.nodes.map( node => (
                        <div key={node} style={{height:500,  display: 'inline-block'}}>
                            <div style={{height:450, borderStyle:'solid',
                                    borderColor:node % 2 == 0 ? '#4682B4' : '#BDB76B',  
                                    backgroundColor: node % 2 == 0 ? '#E0FFFF' : '#FAFAD2'}}>
                                <div><p><b>Node: #{node}</b></p></div>
                                <BlockList resetAddBlockOption="false" />
                            </div>
                        </div>
                        )
                    )
                }
            </div>
        );
    }
}

export default BlockChain;
