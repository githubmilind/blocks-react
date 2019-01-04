import React from 'react';
import ReactDOM from 'react-dom';
import hash from 'hash.js';


import BasicComponent from './components/basic_component';
import BlockData from './components/block_data';
import MenuNav from './components/menu_nav';


// create a new component. This component should produce some HTML
class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: "1",
            nonce: "1",
            data: "",
            hash: "0x",

            buttonDisabled: false,
            buttonText: "Mine Block"
        };

        this.onDataChange = this.onDataChange.bind(this);
        this.mineBlock = this.mineBlock.bind(this);
   }

    onDataChange(newValue){
        this.setState({data: newValue});
    }

    mineBlock(evt){
        this.setState({buttonDisabled: true, buttonText: "please wait..."});

        let found = false;
        for(let x=this.state.nonce; x < 1000000 && !found; x++){
            const data = `Id:${this.state.id} Nonce:${x} Data: ${this.state.data}`; 
            const hashval = hash.sha256().update(data).digest('hex');
            if(hashval.substr(0, 4) === '0000'){
                found = true;
                this.setState({nonce: x, hash: '0x' +hashval});
            }
        }

        this.setState({buttonDisabled: false, buttonText: "Mine Block"});
    }

    render1(){
        return (
                <MenuNav />
        );
    }

    render(){
        return (
            <div>
                <p>Block chain in react</p>
                <ul className="list-unstyled list-group">
                    <li className="list-group-item"><BasicComponent title="Block Id" 
                                    value={this.state.id} /></li>
                    <li className="list-group-item"><BasicComponent title="Nonce" 
                                    value={this.state.nonce} /></li>
                    <li className="list-group-item"><BlockData title="Block data" 
                                    value={this.state.data}
                                    onChange={this.onDataChange}></BlockData></li>
                    <li className="list-group-item"><BasicComponent title="Block hash" 
                                    value={this.state.hash} /></li>
                    <li className="list-group-item"><button 
                            disabled={this.state.buttonDisabled}
                            onClick={this.mineBlock}>{this.state.buttonText}</button></li>
                </ul>
                
            </div>
        );
    }
}


// Take this component's generated HTML & Put it on the page / in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
