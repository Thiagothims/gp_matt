import styles from './NewProject.module.css'

import { useNavigate } from "react-router-dom";

import ProjectForm from '../projects/ProjectForm'

function NewProject() {

    const navigate = useNavigate()            // hook para criar função de redirecionamento - após projeto ser criado

    function createPost(project) {                 // criar projeto - envia os dados para o banco*

        // atributos do projeto
        // initialize gp_matt and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5010/projects", {       // request para o BD
            method: 'POST',                             // qual o método --- POST => envia dados
            headers: {                                  
                'Content-Type': 'application/json'      // indica a forma que que quer trabalhar os dados
            },
            body: JSON.stringify(project)               // envia pro body em formato string json
        })
            .then((resp) => resp.json())
            .then((data) => 
            navigate('/projects',{ state: {message: 'Projeto criado com sucesso!'}}))   //// redirecionar para a rota Projects) /// ajuste, adicionar o {state:{message}}
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criando um novo Projeto</h1>
            <p>Crie seu projeto para depois adicionar seus serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject
