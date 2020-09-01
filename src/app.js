const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const {title, url, techs } = request.body;
    const repository ={
      id: uuid(),
      title,
      url,
      techs,
      likes:0
    }
    repositories.push(repository);
    return response.json(repository);
})


app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const {title, url, techs} = request.body;
    const repositoryIndex = repositories.findIndex(repositor => repositor.id === id );

    
    if(repositoryIndex < 0 ){
      return response.status(400).json({message: 'repository does not exist'});
    }
    const updateRepository ={
      id,
      title,
      url,
      techs,
      likes:0
    }

    repositories[repositoryIndex] = updateRepository;

    return response.json(updateRepository);

  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repositorio => repositorio.id === id)

  if(repositoryIndex < 0){
    return response.status(400).send();
   
  }
  repositories.splice(repositoryIndex,1);

  return response.status(204).send();
  
   
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.find(repositorio => repositorio.id === id);

  if(!repositoryIndex){
    return response.status(400).json({ error: 'Repository not found'});
  }

  repositoryIndex.likes+=1;

  return response.json(repositoryIndex);



   

   
  

});
module.exports = app;
