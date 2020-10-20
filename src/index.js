import { compareAsc, format } from 'date-fns';
import {addTask, addCreator, newProject, addProject, aCreator} from './project';

addProject();
addCreator();

aCreator('All Projects');




const modalBg = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.modal-close')

document.getElementById('tasksubmit').addEventListener('click', function(){
    addTask(this.form)
    modalBg.classList.remove('bg-active')
})

document.getElementById('new-task').addEventListener('click', function(){
    modalBg.classList.add('bg-active')
})


modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-active')
})

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

document.getElementById('projects').addEventListener('click', myFunction)
  // Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#projects')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
    }
}

