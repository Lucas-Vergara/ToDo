const storage = window.localStorage


const newProject = (name) => {

    let tasks = []
    storage.setItem(name, JSON.stringify(tasks))
    clear();
    addProject();
    addCreator();

}

const task = (title, description, date, priority) => {

    const edit = (newTitle, newDescription, newDate, newPriority) => {
        title = newTitle
        description = newDescription
        date = newDate
        priority = newPriority
    }

    return {title, description, date, priority, edit}
}

const addTask = (form) => {
    const project = document.getElementById('projects').firstElementChild.innerHTML
    console.log(project)
    const newTask = task(form.title.value, form.description.value, 'date', 'priority')
    let tasks = JSON.parse(storage.getItem(project))
    tasks.push(newTask)
    storage.setItem(project, JSON.stringify(tasks))   
}


const clear = () => {
    let content = document.getElementById('content')
    content.innerHTML = ''
}

const addCreator = () => {
    let div = document.createElement('div')
    div.classList.add('card')
    let button = document.createElement('button')
    button.id = 'new-project'
    button.innerHTML = 'New Project'
    div.appendChild(button)
    div.addEventListener('click', function(){
        newProject(prompt("Enter Project's Name"))
    })
    document.getElementById('content').appendChild(div)
}

const getProjects = () => {
    const storage = window.localStorage
    const projects = []
    for (let i = 0; i < storage.length; i++) {
        const project = storage.key(i)
        projects.push(project)    
    }
    return {projects}
}

const addProject = () => {
    let storage = getProjects();
    document.getElementById('myDropdown').innerHTML = ''

    for (let i = 0; i < storage.projects.length; i++) {
        const projectName = storage.projects[i];
        let div = document.createElement('div')
        div.classList.add('project-card')
        div.innerHTML = projectName
        div.addEventListener('click', function(){
            goToProject(projectName)
        })
        aCreator(projectName);
        document.getElementById('content').appendChild(div)
    }
}

const aCreator = (name) => {
    let a = document.createElement('a');
    a.innerHTML = name
    document.getElementById('myDropdown').appendChild(a)
}

const goToProject = (name) => {
    clear();
    document.getElementById('content').classList.add('project-content')
    let project = JSON.parse(storage[name])
    for (let i = 0; i < project.length; i++) {
        const task = project[i];
        let content = document.getElementById('content')
        let checkbox = createCheckbox(task.title)
        let div = document.createElement('div')
        div.classList.add('closed-task')
        div.appendChild(checkbox.input)
        div.appendChild(checkbox.label)
        content.appendChild(div)
    }
    let projectsButton = document.getElementById('projects').firstElementChild
    projectsButton.innerHTML = name
}

const createCheckbox = (title) => {
    let input = document.createElement('input')
    input.classList.add('inp-cbx')
    input.id = title
    input.type = 'checkbox'
    input.style = "display: none;"

    let label = document.createElement('label')
    label.classList.add('cbx')
    label.setAttribute('for', title)

    let span1 = document.createElement('span')
    let span2 = document.createElement('span')

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '12px')
    svg.setAttribute('height', '9px')
    svg.setAttribute('viewbox', '0 0 12 9') 

    let polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute('points', '1 5 4 8 11 1') 

    svg.appendChild(polyline)
    span1.appendChild(svg)
    span2.innerText = title

    label.appendChild(span1)
    label.appendChild(span2)

    return {input, label}
}


export {addTask, task, newProject, addProject, addCreator}