import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import{ parse, v4 as uuidv4 } from 'uuid'

import Container from '../layout/Container'
import ProjectForm from '../projects/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../../service/ServiceForm'
import ServiceCard from '../../service/ServiceCard'

function Project() {

    const { id } = useParams()          // utulizando o hook useParams, ja sabe que é pra 'caçar' o id na url

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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
            setServices(data.services)
        })
        .catch((err) => console.log(err))
    },[id])

    function editPost(project) {
        setMessage('')
        // budget validation
        if (project.budget < project.cost) {
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

    function createService(project) {
        // last service
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('error')
            project.services.pop()
            return false
        }
        // add service cost to project total cost

        project.cost= newCost

        //update project

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...project, cost:newCost}) 
        })
        .then((resp) => resp.json())
        .then((data) => {
            //exibir os serviços
            // console.log(data)
            setShowServiceForm(false)
        })
        .catch((err) => console.log(err))     

    }

    function toggleProjectForm() {              // metodo acionado no onclick, faz a mudança do botão, state 'fechar' e 'form'
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {              // metodo acionado no onclick, faz a mudança do botão, state 'fechar' e 'form'
        setShowServiceForm(!showServiceForm)
    }

    function removeService( id, cost ) {

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
            setType('success')
        })
        .catch((err) => console.log(err))

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
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button onClick={toggleServiceForm} className={styles.btn}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                        <div className={styles.project_info}>
                            {showServiceForm && 
                            <ServiceForm
                                handleSubmit={createService}
                                btnText='Adicionar Serviço'
                                projectData={project}    
                            />}    
                        </div>
                        </div>
                            <h2>serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && 
                            services.map((service) => 
                                <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />)
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados para este projeto</p>}
                        </Container>
                </Container>
            </div>
        ):
        ''}
        </>
    )
}

export default Project
