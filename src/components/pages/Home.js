import styles from './Home.module.css'

import logo_new_project from '../img/new_project.svg'
import LinkButton from '../layout/LinkButton'

function Home() {

    return (
        <section className={styles.home_container}>
            <h1>Bem vindo ao <span>GP Matt</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            {/* <LinkButton to='newproject' text="Criar Novo Projeto"/> */}
            <img src={logo_new_project} alt="Logo para novo projeto" />
        </section>
    )
}

export default Home