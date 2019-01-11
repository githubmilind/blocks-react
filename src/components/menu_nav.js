import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';


const Home = () => {
       return ( <div><h1>This is Home panel</h1></div> );
}

const Marketing = () =>{
        return (<div><h1>This is Marketing panel</h1></div>);
}

const Automation = () => {
        return (<div><h1>This is Automation panel</h1></div>);
}

class MenuNav extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
                <div>
                    <Link exact="true" to="/home">Home&nbsp;</Link>
                    <Link exact="true" to="/marketing">Marketing&nbsp;</Link>
                    <Link exact="true" to="/automation">Automation</Link>
                </div>
                <hr />
                    <div>
                    <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/marketing" component={Marketing} />
                    <Route exact path="/automation" component={Automation} />
                    </Switch>
                    </div>
            </div>
            </BrowserRouter>
        );
    }
}

export default MenuNav;