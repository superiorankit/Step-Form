let user = JSON.parse(localStorage.getItem('user'));

let images = [
    "./assets/cardImage/1.png",
    "./assets/cardImage/2.png",
    "./assets/cardImage/3.png",
    "./assets/cardImage/4.png",
    "./assets/cardImage/5.png",
    "./assets/cardImage/6.png",
    "./assets/cardImage/7.png",
    "./assets/cardImage/8.png",
    "./assets/cardImage/9.png",
    "./assets/cardImage/10.png"
]

let scrollDiv = document.getElementById('scrollDiv');

user.map((data)=>{
    let i = Math.floor((Math.random()*10));
    console.log(i)
    scrollDiv.innerHTML=`${scrollDiv.innerHTML}<a href="../../profile.html?id=${data.id}" class="card"><div class="img"><img src="${images[i]}"/></div><h1>${data.teamInformation.teamName}</h1><h3>@${data.personalInformation.username}</h3></a>`
});


