import { createContext, useState, useEffect } from "react";
import {auth, db} from '../Service/firebaseConection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'


export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth]=useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

useEffect(()=> {

    function loadStorage(){
    
    const storageUser = localStorage.getItem('SistemaUser');

    if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
    }

    setLoading(false);
}
loadStorage();
},[])

//fazendo login do usuario

async function signIn(email, password){
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef)

      let data = {
        uid: uid,
        nome: docSnap.data().nome,
        email: value.user.email,
        avatarUrl: docSnap.data().avatarUrl
      }

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      toast.success("Bem-vindo(a) de volta!")
      navigate("/dashboard")
    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
      toast.error("Ops algo deu errado!");
    }) 

  }



// async function signIn(email, password){
//     setLoadingAuth(true);

//     await firebase.auth().signInWithEmailAndPassword(email, password)
//     .then(async (value)=> {
//       let uid = value.user.uid;

//       const userProfile = await firebase.firestore().collection('users')
//       .doc(uid).get();

//       let data = {
//         uid: uid,
//         nome: userProfile.data().nome,
//         avatarUrl: userProfile.data().avatarUrl,
//         email: value.user.email
//       };

//       setUser(data);
//       storageUser(data);
//       setLoadingAuth(false);


//     })
//     .catch((error)=>{
//       setLoadingAuth(false);
//     })

//   }

//cadastrando um novo usuario
async function signUp(email, password, nome){
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async(value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid),{
            nome: nome,
            avatarUrl: null,
        })
        .then(() => {
            let data = {
                uid: uid,
                nome: nome,
                email: value.user.email,
                avatarUrl: null
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem Vindo ao Sistema!');
            navigate("/dashboard")
        })
    })
    .catch((error) => {
        console.log(error)
        setLoadingAuth(false);
    });
}

function storageUser(data){
    localStorage.setItem('SistemaUser', JSON.stringify(data));
}
//fazer logout no usuario
async function signOut(){
    await signOut(auth);
    localStorage.removeItem('SistemaUser');
    setUser(null);
}


    return(
        <AuthContext.Provider 
        value={{
            signed: !!user,
            user,
            loading,
            signUp,
            signOut,
            signIn,
            loadingAuth,
            storageUser,
            setUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;