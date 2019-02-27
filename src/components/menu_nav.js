/*
** Blockchain - Concepts & Demo
** Milind Pansare
*/

import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';

import BlockList from './block_list';
import Crypto from './crypto';
import BlockChain from './block_chain';


class MenuNav extends Component {

    constructor(props){
        super(props);
        this.state = {  
                        cryptoClass: 'col-md-2',
                        blockListClass: 'col-md-2',
                        blockChainClass: 'col-md-2' };

        this.linkClicked = this.linkClicked.bind(this);
    }

    linkClicked(evt){
        switch(evt.target.id){
            case 'cryptodiv': 
                this.setState({cryptoClass: 'col-md-2 btn-primary', blockListClass:'col-md-2', blockChainClass:'col-md-2'});
                break;
            case 'blockListdiv': 
                this.setState({cryptoClass: 'col-md-2', blockListClass:'col-md-2 btn-primary', blockChainClass:'col-md-2'});
                break;
            case 'blockChaindiv': 
                this.setState({cryptoClass: 'col-md-2', blockListClass:'col-md-2', blockChainClass:'col-md-2 btn-primary'});
                break;
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <h4>BlockChain <u><em>Concepts & Demo</em></u></h4>
                    </header>
                    <hr />
                    <div className="row">
                        <Link exact="true" to="/cryptography"><div id='cryptodiv' className={this.state.cryptoClass}
                            onClick={(e) => this.linkClicked(e)}>Cryptography</div></Link>
                        <Link exact="true" to="/blocklist"><div id='blockListdiv' className={this.state.blockListClass}
                            onClick={(e) => this.linkClicked(e)}>Blockchain</div></Link>
                        <Link exact="true" to="/blockchain"><div id='blockChaindiv' className={this.state.blockChainClass}
                            onClick={(e) => this.linkClicked(e)}>Distributed Blockchain</div></Link>
                    </div>
                    <hr />
                    <div>
                        <Switch>
                            <Route path="/cryptography" component={Crypto} />
                            <Route exact path="/blocklist" component={BlockList} />
                            <Route exact path="/blockchain" component={BlockChain} />
                            <Route path="*" component={Crypto} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default MenuNav;