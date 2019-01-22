import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';

import BlockList from './block_list';
import Crypto from './crypto';

const BlockChain = () => {
        return (<div><h1>Distributed Block Chain</h1></div>);
}

class MenuNav extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <div className="row">
                            <Link exact="true" to="/cryptography"><div className="col-md-2">Cryptography</div></Link>
                            <Link exact="true" to="/blocklist"><div className="col-md-2">Block list</div></Link>
                            <Link exact="true" to="/blockchain"><div className="col-md-2">Blockchain distributed</div></Link>
                        </div>
                    </header>
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