import { useState, useContext } from 'react';
import Header from '../../Components/Header';
import './profile.css';
import Title from '../../Components/Title';
import {FcSettings } from 'react-icons/fc';
import {FiUpload } from 'react-icons/fi';
import avatar from '../../Assets/avatar.png';
import {AuthContext} from '../../contexts/auth'
import { doc, updateDoc, db } from 'firebase/firestore'
function Profile(){
    const {user, signOut, storageUser,setUser} =useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl ] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

function handleFile(e){
    if(e.target.files[0]){
        const image = e.target.files[0];

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(image));
        }else{
            alert('Envie uma image no formato JPEG ou PNG');
            setImageAvatar(null);
            return;
        }
    }
}
async function handleSubmit(e){
    e.preventDefault();
    alert('teste')
    if(imageAvatar === null && nome !== ''){
//atualizar apenas o nome do usuario
        const docRef = doc(db,"users", user.uid)
        await updateDoc(docRef,{
            nome: nome,
        })
        .then(()=> {
            let data = {
                ...user,
                nome: nome,
            }
            setUser(data);
            storageUser(data);

        })
    }
}

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Minha Conta">
                    <FcSettings size={25}/>
                </Title>
                <div  className='container'>
                    <form className='form-profile' onSubmit={handleSubmit}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload size={25} color="#fff"/>
                            </span>
                            <input type="file" accept="image/" onChange={handleFile}/><br/>
                            {avatarUrl === null ? (
                            <img src={avatar} width="250" alt="Foto de perfil do usuario" /> 
                             ) :  ( 
                             <img src={avatarUrl} width="250" alt="Foto de perfil do usuario" />
                        )}
                        </label>
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email} disabled={true}  />

                        <button type='submit'>Salvar</button>
                        
                    </form>
                </div>
                <div className='container'>
                    <button className='logout-btn' onClick={() => signOut()}>Sair</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;