const data = JSON.parse(localStorage.getItem('data'));

console.log(data)

document.getElementById("name").innerHTML=data.personalInformation.name;
document.getElementById("phone").innerHTML=data.personalInformation.phone;
document.getElementById("email").innerHTML=data.personalInformation.email;
document.getElementById("gender").innerHTML=data.personalInformation.gender;

document.getElementById("teamName").innerHTML=data.teamInformation.teamName;
document.getElementById("pl1Name").innerHTML=data.teamInformation.player1.nPl1;
document.getElementById("pl1Id").innerHTML=data.teamInformation.player1.rPl1;
document.getElementById("pl2Name").innerHTML=data.teamInformation.player2.nPl2;
document.getElementById("pl2Id").innerHTML=data.teamInformation.player2.rPl2;
document.getElementById("pl3Name").innerHTML=data.teamInformation.player3.nPl3;
document.getElementById("pl3Id").innerHTML=data.teamInformation.player3.rPl3;
document.getElementById("pl4Name").innerHTML=data.teamInformation.player4.nPl4;
document.getElementById("pl4Id").innerHTML=data.teamInformation.player4.rPl4;


// localStorage.removeItem('data');
