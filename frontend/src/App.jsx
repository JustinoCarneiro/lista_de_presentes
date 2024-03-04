import styles from './App.module.css'
import Item from './componentes/Item'
import React from "react";
import { useState, useEffect } from 'react';

function App() {
  const [presentes, setPresentes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api");
      const data = await response.json();
      setPresentes(data.presentes);
    };
    fetchData();
  }, []);

  const handleUpdatePresente = async (id, change) => {
    try {
      console.log(change);
      console.log(`Chamando handleUpdatePresente para o presente com ID ${id}`, change);
      const response = await fetch(`http://localhost:3001/api/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selecionado: change }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar o presente');
      }
  
      setPresentes((prevPresentes) =>
        prevPresentes.map((presente) =>
          presente.id === id ? { ...presente, selecionado: change } : presente
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o presente:', error);
    }
  };

  const handleClick = (id) => {
    setConfirmacao({ ...confirmacao, [id]: true });
  };

  return (
    <div className={styles.body}>
      <div className={styles.overlay}></div>
      <div className={styles.subbody}>
        <div className={styles.header}>
          <p>NIVER 15 ANOS DA LOHANA!! AAAAA!!</p>
        </div>
        <div className={styles.mensagem}>
          <p className={styles.texto_mensagem}>Caso não tenha a possibilidade e/ou condições de presentear,  conto com uma pequena carta, uma singela dedicatória em homenagem aos meus 15 anos!
                                               Afinal sua presença é o meu maior presente !</p>
        </div>
        <div className={styles.mensagem_imagens}>
          <p className={styles.texto_mensagem}>Todas as imagens são meramente ilustrativas.</p>
        </div>
        <div className={styles.mensagem_maquiagem}>
          <p className={styles.texto_mensagem}>As maquiagens são para pele oleosa.</p>
        </div>
        <div className={styles.exibicao}>
        {presentes
          .filter((presente) => !presente.selecionado)
          .map((presente) => (
            <div key={presente.id}>
              <Item
                presente={presente}
                onUpdatePresente={handleUpdatePresente}
                onClick={() => handleClick(presente.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
