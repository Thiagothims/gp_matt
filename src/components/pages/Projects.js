import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../projects/ProjectCard"

import styles from './Projects.module.css'

function Projects() {
    const [projects, setProjects] = useState([])
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
        })
        .catch((err) => console.log(err))
    }, [])

    function removeProject(id) {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
            alert('Tem certeza que deseja excluir o projeto?')
            setProjectMessage('Projeto excluido com sucesso!')
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Novo Projeto'/>
            </div>
            <div>
                {message && <Message type='success' msg={message}/>}
                {projectMessage && <Message type='success' msg={projectMessage}/>}
                <Container customClass='start'>
                    {projects.length > 0 && 
                        projects.map((project) => (
                            <ProjectCard
                                id={project.id}
                                name={project.name}
                                budget={project.budget}
                                category={project.category.name}    // necessário acessar o objeto category (id ou name)
                                key={project.id}
                                handleRemove={removeProject}
                                />
                        ))}
                        {projects.length === 0 && 
                            <p>Não a projetos na sua lista!</p>}
                </Container>
            </div>
        </div>
    )
}

export default Projects
