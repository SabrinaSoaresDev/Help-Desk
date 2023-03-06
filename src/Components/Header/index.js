import { useContext } from 'react';
import './header.css';
import avatar from '../../Assets/avatar.png';
import {AuthContext} from '../../Context/auth';
import {FcHome,FcSettings } from 'react-icons/fc';
import {FiUsers} from 'react-icons/fi';
import {Link} from 'react-router-dom';
function Header(){
    const {user} = useContext(AuthContext);
    return(
        <div className='sideBar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="foto do perfil"/>
            </div>
            <Link to="/dashboard">
                <FcHome size={24}/>
                Chamados
            </Link>
            <Link to="/clientes">
                <FiUsers color='#fff' size={24}/>
                Clientes
            </Link>
            <Link to="/profile">
                <FcSettings size={24} />
                Perfil
            </Link>
        </div>
    )
}

export default Header;