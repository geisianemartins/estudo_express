const { request, response } = require('express');
const express = require('express');
const {v4:uuidv4} = require('uuid')

const app = express();

app.use(express.json());

const projects = [];

// console.log(app);

// CRUD - Create, Read, Update, 
// GET: Buscar informações do back- end
// POST: Criar infos no back-end
//PUT/PATCH: Alterar uma informação no back-end
//DELETE: Deletar infos no back-end

//Query Params: Vamos usar principalmente para filtros e paginação
//Route Params: Identificar recursos na hora de atualizar ou deletar
//Request Params:

app.get('/projects', (request, response) => {
    const {title, owner} = request.query;

    // console.log(title)
    // console.log(owner)

    return response.json(projects)
});

app.post('/projects', (request, response) =>{
    const {title, owner} = request.body;

    const project = {id: uuidv4(), title, owner}

    projects.push(project); //esse push vai jogar a criação dp nosso projeto para o nosso array

    return response.json(project); //retorna o projeto recem-criado e nunca xibir a lista completa
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params  //aqui pegamos nosso ID
    const {title, owner} = request.body; //retorna uma nova informação

    //aqui usamos o findIndex para percorrer todo o array atrás do id.
    //findIndex vai percorrer todos os projetos, e toda vez que ele percorrer na variável project.
    //caso ela seja satisfeira a retornar true, ele vai m retornar o id que estou passando (project => projet.id ===id).
    const projectIndex = projects.findIndex(project => project.id ===id);

    if (projectIndex < 0 ) {
        return response.status(400).json({error: 'Projeto não foi encontrado' });
    }
    
    //agora que tenho indice vou criar uma nova informação de projeto

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const {id} = request.params

    const projectIndex = projects.findIndex(project => project.id ===id);

    if (projectIndex < 0 ) {
        return response.status(400).json({error: 'Projeto não foi encontrado' });
    }
    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3000, () =>{
    console.log('Servidor rodando');
})