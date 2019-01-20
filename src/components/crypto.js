
import React from 'react';
import ReactDOM from 'react-dom';
import hash from 'hash.js';

import BasicComponent from './basic_component';
import BlockData from './block_data';

class Crypto extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            nonce: "1",
            data: "block data",
            blockhash: "0x00",
            blockhashint: 0
        };

        this.dataChanged = this.dataChanged.bind(this);
        this.mineBlock = this.mineBlock.bind(this);
        this.hashBlock = this.hashBlock.bind(this);
        this.nonceChanged = this.nonceChanged.bind(this);
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

    mineBlock(){
        let hashval = '0x00';
        let found = false;
        for(let x=0; x < 1000000 && !found; x++){
            const data = `Nonce:${x} Data: ${this.state.data}`; 
            hashval = hash.sha256().update(data).digest('hex');
            if(hashval.substr(0, 4) === '0000'){
                found = true;
                if( '0x' + hashval != this.state.hash){
                    this.setState({nonce: x, blockhash: '0x' +hashval, blockhashint: parseInt('0x'+hashval, 16)});
                }
            }
        }
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
                                <div style={{ float: "left", width: 150 }}>
                                    <button onClick={this.mineBlock}>Mine</button>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item"><BlockData title="Block data"
                            value={this.state.data}
                            onChange={this.dataChanged}></BlockData></li>
                        <li className="list-group-item"><BasicComponent title="SHA256 hex"
                            value={this.state.blockhash} /></li>
                        <li className="list-group-item"><BasicComponent title="SHA256 decimal"
                            value={this.state.blockhashint} /></li>
                    </ul>
                </div>
            </div>
        );        
    }
}

export default Crypto;
