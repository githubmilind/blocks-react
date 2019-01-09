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
            nonce: "1",
            data: "",
            hash: "0x",
            prevHash: props.prevHash,

            valid: props.blockStatus,
            buttonDisabled: false,
            buttonText: "Mine Block"
        };

        this.onDataChange = this.onDataChange.bind(this);
        this.mineBlock = this.mineBlock.bind(this);
   }

    onDataChange(newValue){
        this.setState({data: newValue, valid: 'false'});
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
                    this.setState({nonce: x, hash: '0x' +hashval, valid: 'true'});
                    this.props.invalidateBlocks(this.state.id, hashval);
                }
            }
        }

        this.setState({buttonDisabled: false, buttonText: "Mine Block"});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ valid: nextProps.blockStatus, prevHash: nextProps.prevHash })
   }

    render1(){
        return (
                <MenuNav />
        );
    }

    render(){
        return (
            <div style={{width:500, 
                backgroundColor:this.state.valid == 'true' ?'green':'red'}} >
                <div style={{width:'95%', margin:10}}>
                <ul className="list-unstyled list-group">
                    <li className="list-group-item"><BasicComponent title="Block Id" 
                                    value={this.state.id} /></li>
                    <li className="list-group-item"><BasicComponent title="Nonce" 
                                    value={this.state.nonce} /></li>
                    <li className="list-group-item"><BlockData title="Block data" 
                                    value={this.state.data}
                                    onChange={this.onDataChange}></BlockData></li>
                    <li className={this.state.valid == 'true' ? 'list-group-item' : 'list-group-item list-group-item-danger'}><BasicComponent title="Block hash" 
                                    value={this.state.hash} /></li>
                    <li className={"list-group-item"}><button 
                            disabled={this.state.buttonDisabled}
                            onClick={this.mineBlock}>{this.state.buttonText}</button></li>
                </ul>
                </div>
            </div>
        );
    }
}

export default Block;