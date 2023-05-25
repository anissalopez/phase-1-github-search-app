//Toggle Button creation 

let button = document.createElement('button');
button.type = "button";
button.classList.add("dropbtn");
button.textContent = `Search By User`;

let userForm = document.getElementById('github-form');
userForm.addEventListener("submit", userSearchHandler);

userForm.appendChild(button);

//Button and submit Event Listeners 
button.addEventListener("click", searchButton);

//Toggle Function
function searchButton(event){

    let toggleText = event.target.textContent;

    if(toggleText === `Search By User`){
        button.textContent = `Search By Repo`;       
    }
    else{
        button.textContent = `Search By User`;
        //userForm.addEventListener("submit", userSearchHandler);
    }
}

//searchBar submit Handlder 

function userSearchHandler (event){
 //need to create a toggle drop down to search for users by repo or user name 
event.preventDefault();
let searchInfo = document.querySelector('#search').value;
userForm.reset();

if(button.textContent === `Search By User`){
    let fetchObject = {
        headers: {
        "Accept": "application/vnd.github.v3+json"
        }
    }
    
    fetch(`https://api.github.com/users/${searchInfo}`, fetchObject)
    .then(function (response){
        return response.json()
    })
    .then(function(data){
        let user = data 
        userHandler(user)
    
    })
   
}

else {
    let fetchObject = {
        headers: {
        "Accept": "application/vnd.github.v3+json"
        }
    }
    
    fetch(`https://api.github.com/search/repositories?q=${searchInfo}`, fetchObject)
    .then(function (response){
        return response.json()
    })
    .then(function(data){
        let repoData = data 
        repoHandler(repoData)
    
    })
  
    

    }   
}


function userHandler (user){
   

//grab username userAvatar and userUrl from fetch returned data and assign variables to them 
   let userName = user['login'];
   let userAvatar = user['avatar_url'];
   let userUrl = user['html_url'];
//create HTML elements to append to the DOM and assign their text content to the value of the variables defined above

    let userDiv = document.querySelector('#user-list');
    let userNameButton = document.createElement('button');
    let userNameLi = document.createElement('li');
    let userAvatarLi = document.createElement('li');
    let userAvatarImg = document.createElement('img');
    let userUrlLi = document.createElement('li');
    let userUrla = document.createElement('a');
    userNameButton.classList.add('userName');

//reassign user elements to variables containing respective values
    userNameButton.textContent = userName;
    userAvatarImg.src = userAvatar;
    userUrla.href = userUrl;
    userUrla.textContent = `User Link`;

//append elements to the DOM
    userDiv.appendChild(userAvatarLi);
    userAvatarLi.appendChild(userAvatarImg);
    userDiv.appendChild(userAvatarLi);
    userDiv.appendChild(userNameLi);
    userNameLi.appendChild(userNameButton);
    userDiv.appendChild(userUrlLi);
    userUrlLi.appendChild(userUrla);

//add click event for userName that will take client to user repos 
    userNameButton.addEventListener("click", displayRepos);
}

//function to fetch repo data by user
function displayRepos(event){
    let userName = event.target.textContent;

    fetch(`https://api.github.com/users/${userName}/repos`)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        let repoData = data;
       repoHandler(data);
    })
    }

//function to display repo Data to DOM 
function repoHandler(data){

    let repoName = " ";
    let repoLink = " ";
    let repoDiv = document.querySelector('#repos-list');

    for (let i=0; i< data.length; i++){

        let repoInformation = document.createElement('li')
        let repoLink = document.createElement('a')

        repoName = data[i].name
        repoLink.href = data[i][`html_url`]
        repoLink.textContent = repoName

        repoDiv.appendChild(repoInformation)
        repoInformation.appendChild(repoLink)
    }
}

//Function to display Repo Data by name 
function repoHandler(repoData){
    console.log(repoData.items)
    let repoName = " ";
    let repoLink = " ";
    let repoDiv = document.querySelector('#repos-list');

    for (let i=0; i< repoData.items.length; i++){

        let repoInformation = document.createElement('li')
        let repoLink = document.createElement('a')

        repoName = repoData.items[i].name
        repoLink.href = repoData.items[i][`html_url`]
        repoLink.textContent = repoName

        repoDiv.appendChild(repoInformation)
        repoInformation.appendChild(repoLink)
    }
}

