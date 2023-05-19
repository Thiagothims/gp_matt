import styles from './ProjectForm.module.css'

import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({handleSubmit, btnText, projectData}) {

    const [categories, setCategories] = useState([])

    const [project, setProject] = useState(projectData || {})

    useEffect(() => {    
        fetch("http://localhost:5010/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {setCategories(data)})
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {     // função para o botão submit - 'e' === evento
        e.preventDefault()      // não deixa o formulário enviar diretamente, aguarda o comando/evento
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e) {                                      //  set os dados do projeto após o evento (onSubmit do formulário) acontecer
        setProject({...project, [e.target.name]: e.target.value})
        //console.log(project)                                        // para acompanhar
    }

    function handleSelect(e) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text     // selectedIndex seleciona o index do id e apresenta o texto
        }
        })
    }

    return (                                                    // adiciona o evento (onSubmit'apertar o botão' e direciona para a arrowfunction 'submit')
        <form className={styles.form} onSubmit={submit}> 
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}        // valida se vem o valor, senão envia vazio
            />
            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o orçamento"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                text="Selecione uma categoria"
                name="categorys_id"
                options={categories}
                handleOnChange={handleSelect}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>

        </form>
    ) 
}

export default ProjectForm
