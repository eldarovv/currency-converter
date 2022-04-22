const ul = document.querySelectorAll('.main ul')

const input1 = document.querySelector('.from input')
const input2 = document.querySelector('.to input')

const info = document.querySelectorAll('.info')

ul[0].childNodes.forEach((element) => {
    element.addEventListener('click', (event) => {
        let active = ul[0].querySelector('.active')
        active.classList.remove('active')
        element.classList.add('active')
        switch (event.target.textContent) {
            case 'USD': 
                event.target.style.borderRadius = '0'
                break
            case 'EUR': 
                event.target.style.borderRadius = '0'
                break
            case 'GBP': 
                event.target.style.borderTopLeftRadius = '0'
                event.target.style.borderBottomLeftRadius = '0'
                event.target.style.borderTopRightRadius = '3px'
                event.target.style.borderBottomRightRadius = '3px'
                break
            default: break
        }

        const  output =  ul[1].querySelector('.active')
        fetch(`https://api.exchangerate.host/latest?base=${event.target.textContent}&symbols=${output.textContent}`)
            .then(response => response.json())
            .then((data) => {
                input2.value = (event.target.textContent != output.textContent) ? (input1.value * data.rates[`${output.textContent}`]).toFixed(3) : input1.value * data.rates[`${output.textContent}`]
                info[0].textContent = `1 ${event.target.textContent} = ${data.rates[`${output.textContent}`]} ${output.textContent}`
                //info[1].textContent = `1 ${output.textContent} = ${1/data.rates[`${output.textContent}`]} ${event.target.textContent}`
            })
        fetch(`https://api.exchangerate.host/latest?base=${output.textContent}&symbols=${event.target.textContent}`)
            .then(response => response.json())
            .then((data) => {
                //info[0].textContent = `1 ${event.target.textContent} = ${data.rates[`${output.textContent}`]} ${output.textContent}`
                info[1].textContent = `1 ${output.textContent} = ${data.rates[`${event.target.textContent}`]} ${event.target.textContent}`
            })
    })
})

ul[1].childNodes.forEach((element) => {
    element.addEventListener('click', (event) => {
        let active = ul[1].querySelector('.active')
        active.classList.remove('active')
        element.classList.add('active')
        switch (event.target.textContent) {
            case 'RUB': 
                event.target.style.borderTopLeftRadius = '3px'
                event.target.style.borderBottomLeftRadius = '3px'
                break
            case 'GBP':
                event.target.style.borderTopRightRadius = '3px'
                event.target.style.borderBottomRightRadius = '3px'
                break
            default: break
        }
        const input = ul[0].querySelector('.active')
        const output =  ul[1].querySelector('.active')
        fetch(`https://api.exchangerate.host/latest?base=${input.textContent}&symbols=${output.textContent}`)
            .then(response => response.json())
            .then(data => {
                input2.value = (event.target.textContent != output.textContent) ? (input1.value * data.rates[`${output.textContent}`]).toFixed(3) : input1.value * data.rates[`${output.textContent}`]
                // info[1].textContent = `1 ${output.textContent} = ${data.rates[`${output.textContent}`]} ${input.textContent}`
                info[0].textContent = `1 ${input.textContent} = ${data.rates[`${output.textContent}`]} ${output.textContent}`
            })
        fetch(`https://api.exchangerate.host/latest?base=${output.textContent}&symbols=${input.textContent}`)
            .then(response => response.json())
            .then(data => {
                info[1].textContent = `1 ${output.textContent} = ${data.rates[`${input.textContent}`]} ${input.textContent}`
                //info[0].textContent = `1 ${output.textContent} = ${data.rates[`${output.textContent}`]} ${event.target.textContent}`
            })    
    })
})

input1.addEventListener('keyup', (event) => {
    const input = ul[0].querySelector('.active')
    const output = ul[1].querySelector('.active')
    fetch(`https://api.exchangerate.host/latest?base=${input.textContent}&symbols=${output.textContent}`)
        .then(response => response.json())
        .then((data) => {
            input2.value = (input.textContent != output.textContent) ? (input1.value * data.rates[`${output.textContent}`]).toFixed(3) : input1.value * data.rates[`${output.textContent}`]
            })
})