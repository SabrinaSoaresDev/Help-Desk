import { useContext } from "react";
import Header from "../../Components/Header/index.js";
import { AuthContext } from "../../Context/auth.js";

function Dashboard(){
    const {signOut} = useContext(AuthContext);
    return(
        <div>
            <Header/>
            
            <button onClick={() => signOut() }>Fazer logout</button>
        </div>
    )
}

export default Dashboard;