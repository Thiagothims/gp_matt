import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Container from '../layout/Container'
import ProjectForm from '../projects/ProjectForm'
import Message from '../layout/Message'

function Project() {

    const { id } = useParams()          // utulizando o hook useParams, ja sabe que é pra 'caçar' o id na url

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    // message set
    const [message, setMessage] = useState()
    const [type, setType] = useState()


    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
        })
        .catch((err) => console.log(err))
    },[id])

    function editPost(project) {
        // budget validation
        if (project.bucget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {              // metodo acionado no onclick, faz a mudança do botão, state 'fechar' e 'form'
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass='column'>
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto:{project.name}</h1>
                        <button onClick={toggleProjectForm} className={styles.btn}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span>{project.category.name}
                                </p>
                                <p>
                                    <span>Orçamento:</span> R$ {project.budget}
                                </p>
                                <p>
                                    <span>Custo total:</span> R$ {project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm
                                handleSubmit={editPost}
                                btnText='Concluir Edição'
                                projectData={project}/>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ):
        ''}
        </>
    )
}

export default Project
