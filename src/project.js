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
    const newTask = task(form.title.value, form.description.value, form.date.value, 'priority')
    let tasks = JSON.parse(storage.getItem(project))
    tasks.push(newTask)
    storage.setItem(project, JSON.stringify(tasks))
    clear();
    renderTasks(JSON.parse(window.localStorage[project]))
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
    aCreator('All Projects');
}

const aCreator = (name) => {
    let a = document.createElement('a');
    a.innerHTML = name
    document.getElementById('myDropdown').appendChild(a)
    a.addEventListener('click', function(){
        goToProject(name)
    })
}

const goToProject = (name) => {
    if (name == 'All Projects'){
        location.reload()
    }
    clear();
    document.getElementById('content').classList.add('project-content')
    let project = JSON.parse(storage[name])
    renderTasks(project)
    let projectsButton = document.getElementById('projects').firstElementChild
    projectsButton.innerHTML = name
}

const renderTasks = (project) => {
    let content = document.getElementById('content')
    for (let i = 0; i < project.length; i++) {
        let checkbox = createCheckbox(project[i].title)
        let task = document.createElement('div')
        let span = document.createElement('span')
        span.style = 'float: right; margin-top: 5px;'
        span.innerText = project[i].date
        task.classList.add('closed-task')
        task.appendChild(checkbox.input)
        task.appendChild(checkbox.label)
        task.appendChild(span)
        openTask(project[i], task)
        content.appendChild(task)
    }
    let div = document.createElement('div')
    div.innerText = 'Clear completed tasks'
    div.classList.add('clear-tasks')
    div.addEventListener('click', clearTasks)
    let div2 = document.createElement('div')
    div2.classList.add('clear-tasks')
    div2.innerText = 'Delete Project'
    div2.addEventListener('click', deleteProject)
    content.appendChild(div)
    content.appendChild(div2)
}

const deleteProject = () => {
    let project = document.getElementById('projects').innerText
    window.localStorage.removeItem(project)
    location.reload()
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

const openTask = (project, task) => {
    let div = document.createElement('div')
    let description = document.createElement('div')
    let date = document.createElement('div')
    date.innerHTML = project.date
    description.innerHTML = project.description
    div.appendChild(description)
    // div.appendChild(date)
    div.classList.add('open-task')
    task.addEventListener('click', function(){
        if (task.children.length == 3) {
            task.appendChild(div)
        } else {
            task.removeChild(task.lastChild)
        }
    })
}

const removeTask = (i) => {
    const project = JSON.parse(window.localStorage[document.getElementById('projects').innerText])
    project.splice(i,1)
    window.localStorage.setItem(document.getElementById('projects').innerText, JSON.stringify(project))
    clear()
    renderTasks(project)
}

const clearTasks = () => {
    const tasks = document.querySelectorAll('.inp-cbx')
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].checked == true){
            removeTask(i)
        }   
    }  
} 


export {addTask, task, newProject, addProject, addCreator, aCreator}