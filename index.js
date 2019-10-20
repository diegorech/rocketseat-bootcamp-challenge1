const express = require('express')
const app = express()

app.use(express.json())
let id = 1
const projects = []
let count = 0


function projectExists(req, res, next) {
  const { id } = req.params
  
  const project = projects.find( proj => proj.id == id )

  if(!project) {
    return res.status(400).send("ID not found")
  }
  return next()
}

function numOfReqs(req, res, next) {
  
  if(req.method) { count = count + 1}

  console.log(`Total number of requisitions ${count}
              Type of requisition ${req.method}`)
   
  return next()
}

app.get('/projects', numOfReqs, (req, res) => {
  
  return res.json({
    projects
  })
})

app.put('/projects/:id', projectExists, numOfReqs,(req, res) => {
  const { id } = req.params
  const { title } = req.body

  projects.find( project => {
    if(project.id == id) {
      project.title = title
    }
  })
  
   

  return res.json(projects)
})

app.post('/projects', numOfReqs, (req, res) => {
  
  const { title, tasks } = req.body
  
  projects.push({
    id: id++,
    title,
    tasks,
  })


  return res.json(projects)
})

app.delete('/projects/:id', projectExists, numOfReqs, (req, res) => {
  const { id } = req.params

  const ArrPosition = projects.findIndex( project => project.id == id)
  console.log(ArrPosition)

  projects.splice(ArrPosition, 1)
       
      
    
    return res.json(projects)
})

app.post('/projects/:id/tasks', projectExists, numOfReqs, (req, res) => {
  const { id } = req.params
  const { task } = req.body
  
  
  projects.find( project =>{ 
    if(project.id == id ){
      project.tasks.push(task)
    }
  })

  return res.json(projects)
})



app.listen(3000, () => console.log('Server ON'))