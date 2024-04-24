let data = JSON.parse(localStorage.getItem('data'));
let user = JSON.parse(localStorage.getItem('user'));

const onLoadFillData = () => {

    if (!data) {
        data = {
            personalInformation: {},
            teamInformation: {
                player1: {},
                player2: {},
                player3: {},
                player4: {}
            }
        }
        localStorage.setItem('data', JSON.stringify(data));
    }
    else {
        if (Object.keys(data.personalInformation).length !== 0) {
            Object.keys(data.personalInformation).forEach((key) => {
                if (key !== "gender") {
                    document.getElementById(key).value = data.personalInformation[key];
                }
                else {
                    document.getElementById(data.personalInformation[key]).checked = true;
                }
            })
        }

        if (Object.keys(data.teamInformation).length !== 0) {
            Object.keys(data.teamInformation).forEach((key1) => {
                if (key1 === "teamName") {
                    document.getElementById(key1).value = data.teamInformation[key1];
                }
                else {
                    Object.keys(data.teamInformation[key1]).forEach((key2) => {
                        document.getElementById(key2).value = data.teamInformation[key1][key2];
                    })

                }

            })
        }
    }

    if (!user) {
        user = [];
        localStorage.setItem('user', JSON.stringify(user));
    }
}

onLoadFillData();


let formBox = 1;

const validateSave = (e) => {
    event.preventDefault();

    let isValid = true;
    let passValid = true;

    let regexObj = {
        name: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
        phone: /^\d{10}$/,
        username: /^\S{3,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@.]+$/
    }

    let gender;
    const elements = e.target.elements;

    for (let i = 0; i < elements.length - 3; i++) {
        let id = elements[i].id;
        let name = elements[i].name;
        let value = elements[i].value;

        if ((name !== "gender") && !regexObj[name].test(value)) {
            isValid = false;
            if (name === "password") {
                passValid = false;
            }
            elements[i].style.animation = "vibrate 0.1s linear 5 alternate";
            elements[i].style.border = "1px solid var(--tertiaryColor)";
            document.querySelector(`#${id}~.error`).style.display = "block"
            elements[i].addEventListener("animationend", (e) => e.target.style.animation = '');
        }
        else if ((id === "male" || id === "female" || id === "other")) {
            if (elements[i].checked) {
                gender = id;
            }
        }
        else {

            if (formBox === 1) {
                data.personalInformation[id] = value;
            }
            else {
                if (id === "teamName") {
                    data.teamInformation.teamName = value;
                }
                else {
                    data.teamInformation[`player${id.charAt(id.length - 1)}`][id] = value;
                }

            }
        }
    }

    document.getElementById('userNot').style.display="none";
    document.getElementById('userNot').style.display="none";
    document.getElementById('teamNot').style.display="none";


    if (formBox === 1) {
        if (gender === undefined) {
            isValid = false;
            let gender = document.getElementById("radio");
            gender.style.animation = "none";
            gender.style.animation = "vibrate 0.1s linear 5 alternate";
            document.getElementById('genderError').style.display = "block"
            gender.addEventListener("animationend", (e) => e.target.style.animation = '');
        }
        else {
            data.personalInformation.gender = gender;
        }

        if(user.some((uData)=>{
            return uData.personalInformation.email === data.personalInformation.email;
        }))
        {
            isValid = false;
            document.getElementById('emailAlready').style.display="block";
        }

        if(user.some((uData)=>{
            return uData.personalInformation.username === data.personalInformation.username;
        }))
        {
            isValid = false;
            document.getElementById('userNot').style.display="block";
        }


        if (passValid) {
            const password = e.target.password.value.trim();
            const cPassword = e.target.cPassword.value.trim();

            document.getElementById('passError').style.display = "none";
            document.getElementById('cPassError').style.display = "none";

            if (password !== cPassword) {
                isValid = false;
                let password = e.target.password;
                let cpassword = e.target.cPassword;
                password.style.animation = "vibrate 0.1s linear 5 alternate";
                password.style.border = "1px solid var(--tertiaryColor)";
                cpassword.style.animation = "vibrate 0.1s linear 5 alternate";
                cpassword.style.border = "1px solid var(--tertiaryColor)";
                document.getElementById('passError').style.display = "block";
                document.getElementById('cPassError').style.display = "block";
                document.getElementById('passError').innerHTML = "Both password should match*"
                document.getElementById('cPassError').innerHTML = "Both password should match*"
                password.addEventListener("animationend", (e) => e.target.style.animation = '');
                cpassword.addEventListener("animationend", (e) => e.target.style.animation = '');
            }
            else {
                data.personalInformation.password = password;
                data.personalInformation.cPassword = cPassword;
            }
        }

    }
    else{
        if(user.some((uData)=>{
            return uData.teamInformation.teamName === data.teamInformation.teamName;
        }))
        {
            isValid = false;
            document.getElementById('teamNot').style.display="block";
        }
    }

    localStorage.setItem('data', JSON.stringify(data));


    if ((e.submitter.id === "persSave" || e.submitter.id === "teamSave") && isValid) {
        const loader = document.getElementById("load");
        loader.style.display = "grid";

        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);


    }

    else {

        if (isValid) {
            document.getElementById(`barIcon${formBox}`).style.backgroundColor = "var(--tertiaryColor)"
            document.getElementById('barRed').style.width = `${(formBox * 50)}%`
            next();
        }
        else {
            document.getElementById(`barIcon${formBox}`).style.backgroundColor = "var(--quaternary)"
            document.getElementById('barRed').style.width = `${((formBox - 1) * 50)}%`
        }

    }

}


const register = () => {
    let check = document.getElementById('agree');
    if (!check.checked) {
        let checkDiv = document.getElementById('checkBox');
        checkDiv.style.animation = "vibrate 0.1s linear 5 alternate";
        checkDiv.addEventListener("animationend", (e) => e.target.style.animation = '');
        return;
    }
    document.getElementById('barIcon3').style.backgroundColor = "var(--tertiaryColor)"
    const loader = document.getElementById("load");
    loader.style.display = "grid";

    let id = ((Math.random()*1000000).toFixed())+data.personalInformation.username;
    
    data.id = id;
    user.push(data);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.removeItem('data');


    setTimeout(() => {
        document.getElementById("form1").reset();
        document.getElementById("form2").reset();
        location.href = "./users.html"
    }, 2000);
}


const isFill = (form) => {

    if (form === 'form1') {
        let isFill = true;
        let gender = false;
        document.querySelectorAll('#form1 input').forEach((tag) => {

            if (tag.name !== "gender" && tag.value.length === 0) {
                isFill = false;
            }
            else if (tag.name === "gender") {
                if (tag.checked) {
                    gender = true;
                }
            }
        })
        let button = document.getElementById("persNext");

        if (isFill && gender) {

            button.style.backgroundColor = "var(--tertiaryColor)";
            button.style.cursor = "pointer";
            button.removeAttribute('disabled');
            button.classList.add('persNextHover');

        }
        else {
            button.style.backgroundColor = "#844659";
            button.style.cursor = "not-allowed";
            button.disabled = true;
            button.classList.remove('persNextHover');
        }
    }
    else if (form === "form2") {
        let isFill = true;
        document.querySelectorAll('#form2 input').forEach((tag) => {

            if (tag.value.length === 0) {
                isFill = false;
            }
        })
        let button = document.getElementById("teamNext");

        if (isFill) {

            button.style.backgroundColor = "var(--tertiaryColor)";
            button.style.cursor = "pointer";
            button.removeAttribute('disabled');
            button.classList.add('teamNextHover');

        }
        else {
            button.style.backgroundColor = "#844659";
            button.style.cursor = "not-allowed";
            button.disabled = true;
            button.classList.remove('teamNextHover');
        }

    }


}

isFill("form1");
isFill("form2");


const handleKey = (e, regKey) => {

    isFill(e.target.form.id)

    document.querySelector(`#${e.target.id}~.error`).style.display = "none";

    let regexObj = {
        name: /^[a-zA-Z\s]+$/,
        phone: /^\d+$/,
        user: /^\S*$/,
        password: /^\S*$/
    }

    const value = e.target.value;
    const tag = e.target;

    tag.style.border = "none"
    if (!regexObj[regKey].test(value)) {
        tag.style.animation = "vibrate 0.1s linear 5 alternate";
        tag.style.border = "1px solid var(--tertiaryColor)"
        tag.addEventListener("animationend", (e) => e.target.style.animation = '');
        tag.value = value.split(e.data).join('');
    }

}




const phoneLength = (e)=>{
    if (e.target.value.length > 9) {
        event.preventDefault();
    }
}


document.querySelectorAll("input").forEach((tag) => {
    tag.addEventListener("focusout", (event) => {
        event.target.style.border = "none";
        document.querySelector(`#${event.target.attributes.id.nodeValue}~.error`).style.display = "none"
    })
})


const passShow = (e) => {

    if (e.target.id === "passHide") {
        document.getElementById('password').type = "text";
        e.target.style.display = "none";
        document.getElementById("passView").style.display = "block"
    }
    else {
        document.getElementById('password').type = "password";
        e.target.style.display = "none";
        document.getElementById("passHide").style.display = "block"
    }
}


const cPassShow = (e) => {

    if (e.target.id === "cPassHide") {
        document.getElementById('cPassword').type = "text";
        e.target.style.display = "none";
        document.getElementById("cPassView").style.display = "block"
    }
    else {
        document.getElementById('cPassword').type = "password";
        e.target.style.display = "none";
        document.getElementById("cPassHide").style.display = "block"
    }
}


let crous = document.getElementsByClassName('crous');

const next = () => {
    formBox++;
    for (let i = 1; i < 4; i++) {
        if (i === formBox) {
            document.getElementById(`crous${i}`).style.display = "flex";
        }
        else {
            document.getElementById(`crous${i}`).style.display = "none";
        }
    }

}

const prev = () => {

    formBox--;
    for (let i = 1; i < 4; i++) {
        if (i === formBox) {
            document.getElementById(`crous${i}`).style.display = "flex";
        }
        else {
            document.getElementById(`crous${i}`).style.display = "none";
        }
    }

}