import {Switch} from 'react-router-dom';
import Route from './Route';
import SignIn from '../Page/SignIn';
import SignUp from '../Page/SignUp';
import Dashboard from '../Page/Dashboard';
import Profile from '../Page/Profile';
function RouteApp(){
    return(
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register"  component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} isPrivate/>
            <Route exact path="/profile" component={Profile} isPrivate/>
        </Switch>
    )
}

export default RouteApp;