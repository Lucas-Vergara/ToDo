const newContainer = () => {

    const container = document.createElement('div')
    container.id = 'newContainer'

}

const divCreator = (amount) => {
    let divs = []
    for(let i=0; i<amount; i++){
        divs.push(document.createElement('div'))
    }
}

const createCheckbox = (title) => {
    let input = document.createElement('input')
    input.classList.add('inp-cbx')
    input.id = title
    input.type = 'checkbox'
    input.style = "display: none;"

    let label = document.createElement('label')
    label.classList.add('cbx')
    label.for = title

    let span1 = document.createElement('span')
    let span2 = document.createElement('span')

    let svg = document.createElement('svg')
    svg.width = '12px'
    svg.height = '9px'
    svg.viewbox = '0 0 12 9'

    let polyline = document.createElement('polyline')
    polyline.points = '1 5 4 8 11 1'

    svg.appendChild(polyline)
    span1.appendChild(svg)
    span2.innerText = title

    label.appendChild(span1)
    label.appendChild(span2)

    return {input, label}
}