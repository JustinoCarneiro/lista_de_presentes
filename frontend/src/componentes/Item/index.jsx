import styles from './Item.module.css'
import { useState } from 'react'
import React from 'react';

function Item({ presente, onUpdatePresente }){
    const [screen, setScreen] = useState(false);

    const handleClick = () => {
        console.log(`Item ${presente.id} clicado!`);
        setScreen(!screen);

        console.log(`Item ${presente.id} ${!screen ? 'selecionado' : 'não selecionado'}`);
        onUpdatePresente(presente.id, !screen);
    };

    return(
        <div className={styles.body} onClick={handleClick}> 
            <img className={styles.imagem} src={`http://localhost:3001/fotos/${presente.img}`} alt={`Presente ${presente.id}`}/>
            <p className={styles.texto}>{presente.descricao}</p>
        </div>
    )
}

export default Item