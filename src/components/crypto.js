
import React from 'react';
import ReactDOM from 'react-dom';
import hash from 'hash.js';

import BasicComponent from './basic_component';
import BlockData from './block_data';

import * as CONSTANTS from './constants';

class Crypto extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            nonce: "1",
            data: "block data",
            blockhash: CONSTANTS.DEFAULT_HASH,
            blockhashint: 0,
            processHash: false,
            buttonText: CONSTANTS.MINE
        };

        this.dataChanged = this.dataChanged.bind(this);
        this.mineBlock = this.mineBlock.bind(this);
        this.hashBlock = this.hashBlock.bind(this);
        this.nonceChanged = this.nonceChanged.bind(this);
        this.handleMineClick = this.handleMineClick.bind(this);
    }

    dataChanged(newValue) {
        this.setState({data:newValue});
        this.hashBlock();
    }

    nonceChanged(evt){
        this.setState({nonce: evt.target.value});
        this.hashBlock();
    }

    hashBlock(){
        const data = `Nonce:${this.state.nonce} Data: ${this.state.data}`; 
        const hashval = hash.sha256().update(data).digest('hex');
        this.setState({blockhash: '0x' +hashval, blockhashint: parseInt('0x'+hashval, 16)});
    }

    handleMineClick() {
        if(this.state.processHash) 
            return;
        this.setState({processHash: true, buttonText:CONSTANTS.MINE_PROCESSING});
    }

    componentDidUpdate() {
        if (this.state.processHash) setTimeout(this.mineBlock, 500)
    }    

    mineBlock(){
        let hashval = CONSTANTS.DEFAULT_HASH;
        let found = false;
        for(let x=0; x < 100000000 && !found; x++){
            const data = `Nonce:${x} Data: ${this.state.data}`; 
            hashval = hash.sha256().update(data).digest('hex');
            if(hashval.substr(0, 4) === '0000'){
                found = true;
                if( '0x' + hashval != this.state.hash){
                    this.setState({nonce: x, blockhash: '0x'+hashval, blockhashint: parseInt('0x'+hashval, 16),
                            processHash: false, buttonText:CONSTANTS.MINE});
                    return;
                }
            }
        }
        this.setState({nonce: x, blockhash: 'NOT FOUND'});
    }


    render(){
        return (
            <div>
                <div style={{ width: '99%', margin: 3, height: 386 }}>
                    <div style={{ height: 2 }}></div>
                    <ul className="list-unstyled list-group">
                        <li className="list-group-item">
                            <div style={{ height: 40 }}>
                                <div style={{ float: "left", width: 150 }}>Nonce</div>
                                <div style={{ float: "left", width: 250 }}>
                                    <input type="text" onChange={this.nonceChanged} value={this.state.nonce} />
                                </div>
                                <div style={{ float: "left", visibility: this.state.processHash == true ? "visible" : "hidden" }}
                                    className='fa fa-spinner fa-spin'></div>
                                <div style={{ float: "left", width: 100 }}>
                                    <button className="btn btn-info btn-sm" 
                                            disabled={this.state.processHash == true ? true: false}
                                            onClick={this.handleMineClick}>{this.state.buttonText}</button>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item"><BlockData title="Block data"
                            value={this.state.data}
                            onChange={this.dataChanged}></BlockData></li>
                        <li className="list-group-item">
                            <div>
                                <div>SHA256 hex</div>
                                <div><font size="3" color="red">{this.state.blockhash.substr(0, 6)}</font><font size="3">{this.state.blockhash.substr(6)}</font></div>
                            </div>
                        </li>
                        <li className="list-group-item"><BasicComponent title="SHA256 decimal"
                            value={this.state.blockhashint} /></li>
                    </ul>
                </div>
            </div>
        );        
    }
}

export default Crypto;
