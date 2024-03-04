const express = require('express');
const cors = require('cors');
const jsonfile = require('jsonfile');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => res.send(
    `<div>
        <h1>
            Primeiras informações compartilhadas via Response
        </h1>
    </div>`
));

const FILE_PATH = 'presentes.json';
const FOTOS_DIR = 'fotos';

app.use('/fotos', express.static(path.join(__dirname, FOTOS_DIR)));

app.get("/api", (req, res) => {
    try {
        const presentes = jsonfile.readFileSync(FILE_PATH);
        res.json({ presentes });
    } catch (error) {
        console.error('Erro ao ler o arquivo de presentes:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.put('/api/update/:id', (req, res) => {
  const id = req.params.id;
  const { selecionado } = req.body;
  console.log(id, selecionado);

  try {
    const presentes = jsonfile.readFileSync(FILE_PATH);
    console.log('Array de Presentes:', presentes);
    
    const presenteIndex = presentes.findIndex((p) => String(p.id) === id);
    console.log(id, presenteIndex);

    if (presenteIndex !== 1) {
      presentes[presenteIndex].selecionado = selecionado;
      jsonfile.writeFileSync(FILE_PATH, presentes);
      res.json({ message: 'Presente atualizado com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Presente não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar o presente:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});


app.listen(PORT, () => {
    console.log(`Executando o nosso primeiro servidor na porta ${PORT}`)
});