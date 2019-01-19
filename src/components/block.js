import React from 'react';
import ReactDOM from 'react-dom';
import hash from 'hash.js';


import BasicComponent from './basic_component';
import BlockData from './block_data';
import MenuNav from './menu_nav';


// create a new component. This component should produce some HTML
class Block extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: props.blockId,
            nonce: "0",
            data: "",
            hash: props.blockHash,
            prevHash: props.prevHash,

            mined: props.blockStatus,
            buttonDisabled: false,
            buttonText: "Mine Block"
        };

        this.onDataChange = this.onDataChange.bind(this);
        this.mineBlock = this.mineBlock.bind(this);
   }

    onDataChange(newValue){
        this.setState({data: newValue, mined: 'false'});
    }

    mineBlock(evt){

        this.setState({buttonDisabled: true, buttonText: "please wait..."});

        let hashval = '0x00';
        let found = false;
        for(let x=0; x < 1000000 && !found; x++){
            const data = `Id:${this.state.id} PrevHash:${this.state.prevHash} Nonce:${x} Data: ${this.state.data}`; 
            hashval = hash.sha256().update(data).digest('hex');
            if(hashval.substr(0, 4) === '0000'){
                found = true;

                if( '0x' + hashval != this.state.hash){
                    this.setState({nonce: x, hash: '0x' +hashval, mined: 'true'});
                    this.props.invalidateBlocks(this.state.id, hashval);
                }
            }
        }

        this.setState({buttonDisabled: false, buttonText: "Mine Block"});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ mined: nextProps.blockStatus, prevHash: nextProps.prevHash })
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
                            <div style={{float:"left"}}>
                                <button 
                                    disabled={this.state.buttonDisabled}
                                    onClick={this.mineBlock}>{this.state.buttonText}</button>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item"><BasicComponent title="Previous Block hash" value={this.state.prevHash} /></li>
                    <li className="list-group-item"><BlockData title="Block data" 
                                    value={this.state.data}
                                    onChange={this.onDataChange}></BlockData></li>
                    <li className={this.state.mined == 'true' ? 'list-group-item' : 'list-group-item list-group-item-danger'}><BasicComponent title="Block hash" 
                                    value={this.state.hash} /></li>
                </ul>
                </div>
            </div>
        );
    }
}

export default Block;