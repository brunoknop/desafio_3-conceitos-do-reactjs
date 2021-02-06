import React from 'react';

import "./styles.css";
import { useEffect, useState } from "react";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(Response => {
      setRepositories(Response.data);
    })
  }, [])

  function handleAddRepository() {
    api.post('repositories', {
      title: `Repositorio ${Date.now()}`,
      url: `http://www.repositorio${Date.now()}.com.br`,
      techs: ["Javascript", "React", "NodeJS"]
    }).then(Response =>{
      setRepositories([...repositories, Response.data]);
    })
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(
      api.get('repositories').then(Response => {
        setRepositories(Response.data);
      }) 
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => <li key={repositorie.id}>{repositorie.title} <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;