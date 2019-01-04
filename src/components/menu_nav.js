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
                <header>
                    <Link exact="true" to="/">Home&nbsp;</Link>
                    <Link exact="true" to="/marketing">Marketing&nbsp;</Link>
                    <Link exact="true" to="/automation">Automation</Link>
                </header>
                <hr />
                    <main>

                    <Switch>
                    <Route exact path="/home" Component = {Home} />
                    <Route exact path="/marketing" Component = {Marketing} />
                    <Route exact path="/automation" Component = {Automation} />
                    </Switch>
                    </main>
            </div>
            </BrowserRouter>
        );
    }
}

export default MenuNav;