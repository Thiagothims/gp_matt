import { Link } from "react-router-dom";

import Container from "./Container";

import styles from './NavBar.module.css'
import logo from '../img/logo_main_m.png'

function NavBar() {

    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                        <img className={styles.img} src={logo} alt="GP Matt" />
                </Link>

                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Meus Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Sobre o GP Matt</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link>
                    </li>
                </ul>

            </Container>
        </nav>
    )
}

export default NavBar
