import {useAuth} from "../../../hooks/useAuth.js";
import "./main.css";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";
import {useLocation} from "react-router-dom";
import styles from "./Header.module.scss"
import Cookies from 'js-cookie'
import { TOKEN, TOKENADMIN } from '../../../app.constants'

const Header = ()=>{
    const { setIsAuth } = useAuth()
    const {pathname} = useLocation()
    const navRef = useRef();
    const {isAuth, isAdmin} = useAuth()

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };
    const navigate = useNavigate()
    const logoutHandler = () => {
        Cookies.remove(TOKEN)
        Cookies.remove(TOKENADMIN)
        setIsAuth(false)
        navigate('/auth')
    }
    let admin = Cookies.get("isAdmin")
    return(
        <header>
            <h2>Нарушениям.Нет</h2>
            {isAuth &&(
                <>
                    <nav ref={navRef}>
                        <a href="/">Ur statements</a>
                        <a href="/new-statement">Create statement</a>
                        {admin === 'false' ? '' : (<a href="/statement">All statement</a>)}
                        { <button className={styles.button} onClick={logoutHandler}>Logout</button>}
                        <button
                            className="nav-btn nav-close-btn"
                            onClick={showNavbar}>
                            <FaTimes />
                        </button>
                    </nav>
                    <button
                        className="nav-btn"
                        onClick={showNavbar}>
                        <FaBars />
                    </button>
                </>)
            }
        </header>
    )
}
export default Header