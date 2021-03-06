const ul = document.querySelectorAll('.main ul')
const input1 = document.querySelector('.from input')
const input2 = document.querySelector('.to input')
const info = document.querySelectorAll('.info')

fetch('https://api.exchangerate.host/latest?base=RUB&symbols=USD')
    .then(response => response.json())
    .then((data) => {
        info[0].textContent = `1 RUB = ${data.rates['USD']} USD`
        input2.value = input1.value * data.rates['USD']
    })
    .catch(error => alert(error))
fetch('https://api.exchangerate.host/latest?base=USD&symbols=RUB')
    .then(response => response.json())
    .then((data) => {
        info[1].textContent = `1 USD = ${data.rates['RUB']} RUB`
    })
    .catch(error => alert(error))

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

        const input = ul[0].querySelector('.active')
        const  output =  ul[1].querySelector('.active')
        if (input.textContent == output.textContent) {
            input2.value = input1.value
            info[0].textContent = `1 ${input.textContent} = 1 ${output.textContent}`
            info[1].textContent = info[0].textContent
        } else {
            fetch(`https://api.exchangerate.host/latest?base=${event.target.textContent}&symbols=${output.textContent}`)
                .then(response => response.json())
                .then((data) => {
                input2.value = (input1.value * data.rates[`${output.textContent}`]).toFixed(3)
                info[0].textContent = `1 ${event.target.textContent} = ${data.rates[`${output.textContent}`]} ${output.textContent}`
            })
            fetch(`https://api.exchangerate.host/latest?base=${output.textContent}&symbols=${event.target.textContent}`)
                .then(response => response.json())
                .then((data) => {
                info[1].textContent = `1 ${output.textContent} = ${data.rates[`${event.target.textContent}`]} ${event.target.textContent}`
            })
        }
        
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
        if (input.textContent == output.textContent) {
            input2.value = input1.value
            info[0].textContent = `1 ${input.textContent} = 1 ${output.textContent}`
            info[1].textContent = info[0].textContent
        } else {
            fetch(`https://api.exchangerate.host/latest?base=${input.textContent}&symbols=${output.textContent}`)
                .then(response => response.json())
                .then(data => {
                    input2.value = (input1.value * data.rates[`${output.textContent}`]).toFixed(3)
                    info[0].textContent = `1 ${input.textContent} = ${data.rates[`${output.textContent}`]} ${output.textContent}`
                })
                .catch(error => alert(error))
            fetch(`https://api.exchangerate.host/latest?base=${output.textContent}&symbols=${input.textContent}`)
                .then(response => response.json())
                .then(data => {
                    info[1].textContent = `1 ${output.textContent} = ${data.rates[`${input.textContent}`]} ${input.textContent}`
                })
                .catch(error => alert(error))
            }   
    })
})

input1.addEventListener('keyup', (event) => {
    const comma = input1.value.split('').find(element => element == ',')
    if (comma == ',') {
        input1.value = input1.value.replace(',', '.')
    }
    const input = ul[0].querySelector('.active')
    const output = ul[1].querySelector('.active')
    if (input.textContent == output.textContent) {
        input2.value = input1.value
    } else {
        fetch(`https://api.exchangerate.host/latest?base=${input.textContent}&symbols=${output.textContent}`)
        .then(response => response.json())
        .then((data) => {
            input2.value = (input1.value * data.rates[`${output.textContent}`]).toFixed(3)
        })
        .catch(error => alert(error))
    }
})

input2.addEventListener('keyup', (event) => {
    const input = ul[1].querySelector('.active')
    const output = ul[0].querySelector('.active')
    if (input.textContent == output.textContent) {
        input1.value = input2.value
    } else {
        fetch(`https://api.exchangerate.host/latest?base=${input.textContent}&symbols=${output.textContent}`)
        .then(response => response.json())
        .then((data) => {
            input1.value = (input2.value * data.rates[`${output.textContent}`]).toFixed(3)
        })
        .catch(error => alert(error))
    }
})