import React from 'react';
import ReactDOM from 'react-dom';
import hash from 'hash.js';

import BasicComponent from './basic_component';
import BlockData from './block_data';
import * as CONSTANTS from './constants';

// create a new component. This component should produce some HTML
class Block extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: props.blockId,
            nonce: props.nonce,
            data: props.blockData,
            hash: props.blockHash,
            prevHash: props.prevHash,

            mined: props.blockStatus,
            processHash: false,
            buttonText: CONSTANTS.MINE
        };

        this.onDataChange = this.onDataChange.bind(this);
        this.mineBlock = this.mineBlock.bind(this);
        this.handleMineClick = this.handleMineClick.bind(this);
   }

    onDataChange(newValue){
        this.setState({data: newValue, mined: 'false'});
    }

    handleMineClick() {
        if (this.state.processHash)
            return;
        this.setState({ processHash: true, buttonText: CONSTANTS.MINE_PROCESSING });
    }    

    mineBlock(evt){
        let hashval = CONSTANTS.DEFALUT_HASH;
        let found = false;
        for(let x=0; x < 1000000 && !found; x++){
            const data = `Id:${this.state.id} PrevHash:${this.state.prevHash} Nonce:${x} Data: ${this.state.data}`; 
            hashval = hash.sha256().update(data).digest('hex');
            if(hashval.substr(0, 4) === '0000'){
                found = true;

                if( hashval != this.state.hash){
                    this.setState({nonce: x, hash: '0x'+hashval, mined: 'true'});
                    this.props.invalidateBlocks(this.state.id, this.state.data, x, hashval);
                }
            }
        }
        this.setState({processHash: false, buttonText:CONSTANTS.MINE});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ mined: nextProps.blockStatus, prevHash: nextProps.prevHash, 
                    data: nextProps.blockData, hash:nextProps.blockHash, nonce:nextProps.nonce });
   }

   componentDidUpdate() {
    if (this.state.processHash) setTimeout(this.mineBlock, 500)
    }    


    render(){
        return (
            <div style={{width:500, 
                backgroundColor:this.state.mined == 'true' ?'green': this.state.mined == 'new'? 'blue' : 'red'}} >
                <div style={{width:'99%', margin:3, height:386}}>
                <div style={{height:2}}></div>
                <ul className="list-unstyled list-group">
                    <li className="list-group-item">
                        <div style={{height:40}}>
                            <div style={{float:"left", width:150}}>
                                <BasicComponent title="Block Id" value={this.state.id+1} />
                            </div>
                            <div style={{float:"left", width:150}}>
                                <BasicComponent title="Nonce" value={this.state.nonce} />
                            </div>
                            <div style={{ float: "left", visibility: this.state.processHash == true ? "visible" : "hidden" }}
                                    className='fa fa-spinner fa-spin'>
                            </div>
                            <div style={{float:"left"}}>
                                <button className="btn btn-info btn-sm"
                                    disabled={this.state.processHash == true ? true: false}
                                    onClick={this.handleMineClick}>{this.state.buttonText}</button>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item"><BasicComponent title="Previous Block hash" value={(this.state.prevHash === CONSTANTS.DEFAULT_HASH ? '' : '0x')+this.state.prevHash} /></li>
                    <li className="list-group-item"><BlockData title="Block data" 
                                    blockData={this.state.data}
                                    onChange={this.onDataChange} /></li>
                    <li className={this.state.mined == 'true' ? 'list-group-item' : 'list-group-item list-group-item-danger'}><BasicComponent title="Block hash" 
                                    value={(this.state.hash === CONSTANTS.DEFAULT_HASH ? '' : '0x')+ this.state.hash} /></li>
                </ul>
                </div>
            </div>
        );
    }
}

export default Block;