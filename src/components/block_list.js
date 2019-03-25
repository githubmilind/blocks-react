/*
** Blockchain - Concepts & Demo
** Milind Pansare
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Block from './block';
import * as CONSTANTS from './constants';


class BlockList extends React.Component {

    constructor(props){
        super(props);

        var storedState = localStorage.getItem(CONSTANTS.STORAGE_KEY_BLOCKLIST);
        if (storedState && storedState !== "") {
            this.state = JSON.parse(storedState);
            this.state.resetAddBlockOption = props.resetAddBlockOption !== undefined && props.resetAddBlockOption == "false" ? 'false' : 'true';
        } else {
            this.state = {
                blocks: [{ id: 0, mined:CONSTANTS.BLOCK_STATUS_NEW, blockData:'', hash:CONSTANTS.DEFAULT_HASH, nonce: 0 },],
                lastId: 1,
                resetAddBlockOption: props.resetAddBlockOption !== undefined && props.resetAddBlockOption == "false" ? 'false' : 'true'
            };
        } 
        
        this.addNewBlock = this.addNewBlock.bind(this);
        this.invalidateBlocks = this.invalidateBlocks.bind(this);
        this.resetBlockList = this.resetBlockList.bind(this);
    }

    invalidateBlocks(blockId, newBlockData, newNonce, hashValue){
        var oldState = this.state.blocks.slice();
        
        oldState = this.state.blocks.map(item => {return {id : item.id,  mined:item.id > blockId ? CONSTANTS.BLOCK_STATUS_NOT_MINED : 
                                                                            (item.id == blockId ? CONSTANTS.BLOCK_STATUS_MINED : item.mined), 
                                                        blockData: item.id == blockId ? newBlockData : item.blockData,
                                                        hash: item.id == blockId ? hashValue : item.hash,
                                                        nonce: item.id == blockId ? newNonce: item.nonce}; });

        this.setState({blocks: oldState});
    }

    addNewBlock(){
        this.setState({ blocks: this.state.blocks.concat({id: this.state.lastId, mined:CONSTANTS.BLOCK_STATUS_NEW, blockData:'', hash:CONSTANTS.DEFAULT_HASH, nonce: 0}),
                         lastId: this.state.lastId+1
                         });
    }

    resetBlockList(){
        this.setState({blocks: [{ id: 0, mined:CONSTANTS.BLOCK_STATUS_NEW, blockData: '', hash:CONSTANTS.DEFAULT_HASH, nonce: 0 },], lastId: 1, resetAddBlockOption: 'true'});
    }

    componentDidUpdate(){
        localStorage.setItem(CONSTANTS.STORAGE_KEY_BLOCKLIST, JSON.stringify(this.state));
    }

    render() {
        return (
            <div>
                { this.state.resetAddBlockOption === 'true' && (
                <div style={{height:50}}>
                    <div style={{float:"left", width:100}}><button className="btn btn-warning" onClick={this.resetBlockList}>Reset Block List</button></div> 
                </div>
                )}
                <div style={{ display: 'table', clear:"left" }}>
                    {this.state.blocks.map((item, index, array) => (<div key={item.id} style={{ display: 'table-cell', paddingRight: 5 }}><Block key={item.id}
                        blockId={item.id}
                        nonce={item.nonce}
                        blockHash={item.hash}
                        prevHash={index - 1 > -1 ? array[index - 1].hash : CONSTANTS.DEFAULT_HASH}
                        blockStatus={item.mined}
                        invalidateBlocks={this.invalidateBlocks} 
                        blockData={item.blockData}/></div>))}

                { this.state.resetAddBlockOption === 'true' && (
                    <div className="align-items-center justify-content-center">
                        <button className="btn btn-primary btn-lg" onClick={this.addNewBlock}>Add New Block</button>
                    </div>
                )}
                </div>
            </div>
        );
    }
}

export default BlockList;
