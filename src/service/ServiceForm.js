import styles from '../components/projects/ProjectForm.module.css'

import { useState } from 'react'
import Input from '../components/form/Input'
import SubmitButton from '../components/form/SubmitButton'

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type='text'
                text='Nome do serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <Input 
                type='number'
                text='Custo do serviço'
                name='cost'
                placeholder='Insira o custo total'
                handleOnChange={handleChange}
                // value={service.cost ? service.value : 0}
            />
            <Input 
                type='text'
                text='Descrição do serviço'
                name='description'
                placeholder='Detalhe o serviço'
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm
