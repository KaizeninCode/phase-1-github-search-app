function matchUser(){
    document.querySelector('#submit').addEventListener('submit', (e) => {
        e.preventDefault()
        fetch('https://api.github.com/search/users', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Accept: 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
                query:`username:${document.querySelector("#search").value}`
            })
        })
        .then(res => res.json())
        .then(data => {
            let name = document.querySelector('#search').value
            for (name in data.items){
                let list = document.createElement('li')
                list.innerHTML = `<p>${name}</p>`
                list.addEventListener('click', displayRepo())
                document.querySelector('#user-list').appendChild(list)
            }
        })
    })
}

window.addEventListener('load', () => { //allows all the content to be loaded first, then calls the matchUser function
    matchUser();
});

function displayRepo(){
    let name = document.querySelector('#search').value
    let list = document.querySelector('li')
    list.addEventListener('click', () => {
        const accessToken = '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'
        fetch(`https://api.github.com/users/${name}/repos?type=all&sort=created&direction=desc&per_page=100&access_token=${accessToken}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                Accept: 'application/vnd.github.v3+json',
            }            
        })
        .then(res => res.json())
        .then(data => {
            for(repo in data){
                let list = document.createElement('li')
                list.innerHTML = `<p>${repo}</p>`
                document.querySelector('#repos-list').appendChild(list)                
            }
        })
    })
}
