import styles from './Message.module.css'

import { useState, useEffect } from 'react'

function Message({type, msg}) {
    const [visible, setVisible] = useState(false)       // controlar a visibilidade da mensagem --- começando false

    useEffect(() => {                   // altera a aparição da mensagem
        if (!msg) {         // se a msg NÃO existe
            setVisible(false)
            return 
        }

        setVisible(true)    // se a msg existe

        const timer = setTimeout(() => {    // timer para tempo de aparição da msg
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)    // após o timer, clear
    }, [msg])

    return (
        <>
        {visible && 
        <div className={`${styles.message} ${styles[type]}`}>
            {msg}
        </div>}
        </>
    )
}

export default Message
