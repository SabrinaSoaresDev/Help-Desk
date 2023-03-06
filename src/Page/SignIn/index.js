import { useState , useContext} from 'react';
import {AuthContext} from '../../Context/auth.js';
import {Link} from 'react-router-dom';
import './signIn.css';
import logo from '../../Assets/logo.png';

function SignIn(){
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    
    const {signIn, loadingAuth} = useContext(AuthContext)
    
    function handleSubmit(e){
        console.log('carregando');
        e.preventeDefault()
        if(email !== '' && password !== ''){
            signIn(email,password)
            console.log('carregando');
        }
    }
    return(
        <div className='container-center'>
            <div className='login'>
                <div className='logo-area'>
                    <img src={logo} alt="sistema logo"/>
                </div>
                <form onSubmit={handleSubmit} >
                    <h1>Entrar</h1>
                    <input type="text" placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>

                    <Link to="/register">Criar uma Conta</Link>
                </form>
            </div>
        </div>
    )
}

export default SignIn;