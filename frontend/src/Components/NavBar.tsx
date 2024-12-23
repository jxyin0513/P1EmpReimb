import React, { useContext } from 'react';
import { UserContext } from './Context';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate, } from 'react-router-dom';


// interface NavBarProps {
//     isLoggedIn: boolean;
//     onLogin: () => void;
//     onLogout: () => void;
// }

export const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    
    const onHome = () => {
        if(user){
            logOut();
        }else{
           navigate("/"); 
        }
    }
    const logOut = async () =>{

        await axios.delete(`http://localhost:4040/users/logout`, {withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            setUser(null);
            navigate("/");
        }).catch((err)=>console.log(err.response.data))
    }
    const onLogin = () => {
        console.log("Login");
        if(user){
            logOut();
        }else{
            navigate("/");
        }
    }
    return (
        <nav style={styles.nav}>
            {/* <NavLink to={"/"} end className={"logo"} style={styles.brand}></NavLink> */}
                <div className={"logo"} onClick={onHome} style={styles.brand}>ReImb</div>
            
            <div style={styles.buttons}>
                {user ? (
                    <Button onClick={()=>logOut()}>Logout</Button>
                ) : (
                    <>
                        <Button onClick={onLogin} >Login</Button>
                        {/* <button onClick={onLogout} style={styles.button}>Logout</button> */}
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#333',
        color: '#fff',
    },
    brand: {
        fontSize: '1.5rem',
        textDecoration: "none",
        color: "#fff",
        cursor: "pointer",
    },
    buttons: {
        display: 'flex',
        gap: '0.5rem',
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: '#fff',
        color: '#333',
        border: 'none',
        cursor: 'pointer',
    },
};
