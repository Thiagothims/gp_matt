import styles from './ProjectCard.module.css'
import {CiCircleRemove, CiPen} from 'react-icons/ci'
import { Link } from 'react-router-dom'


function ProjectCard({ id, name, budget, category, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span>{category}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`} ><CiPen/> Editar</Link>
                <Link onClick={remove} to='/'><CiCircleRemove/> Excluir</Link>
            </div>
        </div>
    )
}

export default ProjectCard
