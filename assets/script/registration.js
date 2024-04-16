
let data = JSON.parse(localStorage.getItem('data'));

if (!data) {
    let data = {
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



const registerPersonal = (e) => {
    event.preventDefault();
    
    const name = e.target.name.value.trim();
    const phone = e.target.phone.value.trim();
    const email = e.target.email.value.trim();
    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();
    const cPassword = e.target.cPassword.value.trim();

    const arr = ["male", "female", "other"];
    let gender;
    arr.forEach((gen) => {
        if (document.getElementById(gen).checked) {
            gender = gen;
        }

    });

    let isValid = true;

    // Validation function for name
    const checkName = () => {

        for (let char of name) {
            if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === " ")) {
                return true;
            }
        }

    }

    if (name.length === 0 || checkName()) {
        isValid = false;
        let name = e.target.name;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nameError').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }


    if (phone.includes('e') || phone.includes('E') || isNaN(phone) || phone.length !== 10) {
        isValid = false;
        let phone = e.target.phone;
        phone.style.animation = "vibrate 0.1s linear 5 alternate";
        phone.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('phoneError').style.display = "block"
        phone.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    //Validation function for email
    const checkEmail = () => {

        if (!email) {
            return false;
        }

        if (email.includes(" ")) {
            return false;
        }

        const atIndex = email.indexOf('@');
        if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
            return false;
        }

        const dotIndex = email.indexOf('.', atIndex);
        if (dotIndex === -1 || dotIndex === atIndex + 1 || dotIndex === email.length - 1) {
            return false;
        }

        const lastIndex = email.length - 1;

        if (email.charAt(lastIndex) === "@" || email.charAt(lastIndex) === ".") {
            return false;
        }

        return true;
    }

    if (!checkEmail()) {
        isValid = false;
        let email = e.target.email;
        email.style.animation = "vibrate 0.1s linear 5 alternate";
        email.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('emailError').style.display = "block"
        email.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (gender === undefined) {
        isValid = false;
        let gender = document.getElementById("radio");
        gender.style.animation = "none";
        gender.style.animation = "vibrate 0.1s linear 5 alternate";
        document.getElementById('genderError').style.display = "block"
        gender.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (username.length < 3 || username.includes(" ")) {
        isValid = false;
        let usertag = e.target.username;
        usertag.style.animation = "vibrate 0.1s linear 5 alternate";
        usertag.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('userError').style.display = "block";
        if (username.includes(" ")) {
            document.getElementById('userError').innerHTML = "username can't contain spaces*"
        }

        usertag.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    // Validating function for password for having atleast one character,both cases and digit.
    const checkPassword = () => {
        let hasUpperCase = false;
        let hasLowerCase = false;
        let hasDigit = false;
        let hasSpecialChar = false;

        for (let char of password) {
            if (char >= 'A' && char <= 'Z') {
                hasUpperCase = true;
            } else if (char >= 'a' && char <= 'z') {
                hasLowerCase = true;
            } else if (char >= '0' && char <= '9') {
                hasDigit = true;
            } else {
                hasSpecialChar = true;
            }
        }

        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
    }

    document.getElementById('passError').style.display = "none";
    document.getElementById('cPassError').style.display = "none";

    if (password.length === 0 || password.length < 5 || !checkPassword()) {
        isValid = false;
        let password = e.target.password;
        password.style.animation = "vibrate 0.1s linear 5 alternate";
        password.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('passError').style.display = "block"
        document.getElementById('passError').innerHTML = "Password must be 5+ characters with at least one spc. character, uppercase, lowercase, and digit*"
        password.addEventListener("animationend", (e) => e.target.style.animation = '');
    }


    else if (password !== cPassword) {
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


    if (isValid) {
        let Ldata = JSON.parse(localStorage.getItem("data"));
        Ldata.personalInformation = { name, phone, email, username, gender, password, cPassword };
        localStorage.setItem('data', JSON.stringify(Ldata));
        document.getElementById('barIcon1').style.backgroundColor = "var(--tertiaryColor)"
        document.getElementById('barRed').style.width = "50%"
        shiftLeft();
    }
    else {
        document.getElementById('barIcon1').style.backgroundColor = "var(--quaternary)"
        document.getElementById('barRed').style.width = "0%"
    }
}

const registerTeam = (e) => {
    event.preventDefault();

    const teamName = e.target.teamName.value.trim();
    const nPl1 = e.target.nPl1.value.trim();
    const rPl1 = e.target.rPl1.value.trim();
    const nPl2 = e.target.nPl2.value.trim();
    const rPl2 = e.target.rPl2.value.trim();
    const nPl3 = e.target.nPl3.value.trim();
    const rPl3 = e.target.rPl3.value.trim();
    const nPl4 = e.target.nPl4.value.trim();
    const rPl4 = e.target.rPl4.value.trim();

    let isValid = true;

    // Validation function for name
    const checkName = (name) => {

        for (let char of name) {
            if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === " ")) {
                return true;
            }
        }

    }


    if (teamName.length === 0 || checkName(teamName)) {
        isValid = false;
        let name = e.target.teamName;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('teamError').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }


    if (nPl1.length === 0 || checkName(nPl1)) {
        isValid = false;
        let name = e.target.nPl1;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nPl1Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (rPl1.length === 0) {
        isValid = false;
        let name = e.target.rPl1;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('rPl1Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (nPl2.length === 0 || checkName(nPl2)) {
        isValid = false;
        let name = e.target.nPl2;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nPl2Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (rPl2.length === 0) {
        isValid = false;
        let name = e.target.rPl2;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('rPl2Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (nPl3.length === 0 || checkName(nPl3)) {
        isValid = false;
        let name = e.target.nPl3;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nPl3Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (rPl3.length === 0) {
        isValid = false;
        let name = e.target.rPl3;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('rPl3Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (nPl4.length === 0 || checkName(nPl4)) {
        isValid = false;
        let name = e.target.nPl4;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nPl4Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (rPl4.length === 0) {
        isValid = false;
        let name = e.target.rPl4;
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('rPl4Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }


    if (isValid) {
        let Ldata = JSON.parse(localStorage.getItem("data"));
        Ldata.teamInformation = {
            teamName,
            player1: { nPl1, rPl1 },
            player2: { nPl2, rPl2 },
            player3: { nPl3, rPl3 },
            player4: { nPl4, rPl4 }

        };
        localStorage.setItem('data', JSON.stringify(Ldata));
        document.getElementById('barIcon2').style.backgroundColor = "var(--tertiaryColor)"
        document.getElementById('barRed').style.width = "100%"
        shiftLeft();

    }
    else {
        document.getElementById('barIcon2').style.backgroundColor = "var(--quaternary)"
        document.getElementById('barRed').style.width = "50%"
    }
}

const register = () => {
    let check = document.getElementById('agree');
    if (!check.checked) {
        let checkDiv = document.getElementById('checkBox');
        console.log(checkDiv);
        checkDiv.style.animation = "vibrate 0.1s linear 5 alternate";
        checkDiv.addEventListener("animationend", (e) => e.target.style.animation = '');
        return;
    }
    document.getElementById('barIcon3').style.backgroundColor = "var(--tertiaryColor)"
    const loader = document.getElementById("load");
    loader.style.display = "grid";

    let fData = JSON.parse(localStorage.getItem('data'));
    localStorage.setItem('fData',JSON.stringify(fData));
    localStorage.removeItem('data');

    setTimeout(() => {
        document.getElementById("form1").reset();
        document.getElementById("form2").reset();
        location.href = "./profile.html"
    }, 2000);
}

const savePers = () => {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const cPassword = document.getElementById("cPassword").value.trim();

    const arr = ["male", "female", "other"];
    let gender;
    arr.forEach((gen) => {
        if (document.getElementById(gen).checked) {
            gender = gen;
        }

    });




    let isValid = true;

    // Validation function for name
    const checkName = () => {

        for (let char of name) {
            if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === " ")) {
                return true;
            }
        }

    }

    if (name.length !== 0 && checkName()) {
        isValid = false;
        let name = document.getElementById("name");
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nameError').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }


    if (phone.length !== 0 && (phone.includes('e') || phone.includes('E') || isNaN(phone) || phone.length !== 10)) {
        isValid = false;
        let phone = document.getElementById("phone");
        phone.style.animation = "vibrate 0.1s linear 5 alternate";
        phone.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('phoneError').style.display = "block"
        phone.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    //Validation function for email
    const checkEmail = () => {

        if (!email) {
            return false;
        }

        if (email.includes(" ")) {
            return false;
        }

        const atIndex = email.indexOf('@');
        if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
            return false;
        }

        const dotIndex = email.indexOf('.', atIndex);
        if (dotIndex === -1 || dotIndex === atIndex + 1 || dotIndex === email.length - 1) {
            return false;
        }

        const lastIndex = email.length - 1;

        if (email.charAt(lastIndex) === "@" || email.charAt(lastIndex) === ".") {
            return false;
        }

        return true;
    }

    if (email.length !== 0 && !checkEmail()) {
        isValid = false;
        let email = document.getElementById('email');
        email.style.animation = "vibrate 0.1s linear 5 alternate";
        email.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('emailError').style.display = "block"
        email.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (username.length !== 0 && (username.length < 3 || username.includes(" "))) {
        isValid = false;
        let usertag = document.getElementById("username");
        usertag.style.animation = "vibrate 0.1s linear 5 alternate";
        usertag.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('userError').style.display = "block";
        if (username.includes(" ")) {
            document.getElementById('userError').innerHTML = "username can't contain spaces*"
        }

        usertag.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    // Validating function for password for having atleast one character,both cases and digit.
    const checkPassword = () => {
        let hasUpperCase = false;
        let hasLowerCase = false;
        let hasDigit = false;
        let hasSpecialChar = false;

        for (let char of password) {
            if (char >= 'A' && char <= 'Z') {
                hasUpperCase = true;
            } else if (char >= 'a' && char <= 'z') {
                hasLowerCase = true;
            } else if (char >= '0' && char <= '9') {
                hasDigit = true;
            } else {
                hasSpecialChar = true;
            }
        }

        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
    }

    document.getElementById('passError').style.display = "none";
    document.getElementById('cPassError').style.display = "none";

    if (password.length !== 0 && (password.length < 5 || !checkPassword())) {
        isValid = false;
        let password = document.getElementById("password");
        password.style.animation = "vibrate 0.1s linear 5 alternate";
        password.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('passError').style.display = "block"
        document.getElementById('passError').innerHTML = "Password must be 5+ characters with at least one spc. character, uppercase, lowercase, and digit*"
        password.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (password !== cPassword) {
        isValid = false;
        let password = document.getElementById("password");
        let cpassword = document.getElementById("cPassword");
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

    if (isValid) {
        const loader = document.getElementById("load");
        loader.style.display = "grid";

        let data = JSON.parse(localStorage.getItem('data'));

        if (name.length !== 0) {
            data.personalInformation.name = name;
        }

        if (phone.length !== 0) {
            data.personalInformation.phone = phone;
        }

        if (email.length !== 0) {
            data.personalInformation.email = email;
        }

        if (username.length !== 0) {
            data.personalInformation.username = username;
        }

        if (password.length !== 0) {
            data.personalInformation.password = password;
        }

        if (cPassword.length !== 0) {
            data.personalInformation.cPassword = cPassword;
        }

        if (gender !== undefined) {
            data.personalInformation.gender = gender;
        }

        localStorage.setItem('data', JSON.stringify(data));

        setTimeout(()=>{
            const loader = document.getElementById("load");
            loader.style.display = "none";
        },1000)
    }



}

const saveTeam = () => {


    const teamName = document.getElementById("teamName").value.trim();
    const nPl1 = document.getElementById("nPl1").value.trim();
    const rPl1 = document.getElementById("rPl1").value.trim();
    const nPl2 = document.getElementById("nPl2").value.trim();
    const rPl2 = document.getElementById("rPl2").value.trim();
    const nPl3 = document.getElementById("nPl3").value.trim();
    const rPl3 = document.getElementById("rPl3").value.trim();
    const nPl4 = document.getElementById("nPl4").value.trim();
    const rPl4 = document.getElementById("rPl4").value.trim();

    let isValid = true;

    // Validation function for name
    const checkName = (name) => {

        for (let char of name) {
            if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === " ")) {
                return true;
            }
        }

    }


    if (teamName.length !== 0 && checkName(teamName)) {
        isValid = false;
        let name = document.getElementById("teamName");
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('teamError').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }


    if (nPl1.length !== 0 && checkName(nPl1)) {
        isValid = false;
        let name = document.getElementById("nPl1");
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nPl1Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }


    if (nPl2.length !== 0 && checkName(nPl2)) {
        isValid = false;
        let name = document.getElementById("nPl2");
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nPl2Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }


    if (nPl3.length !== 0 && checkName(nPl3)) {
        isValid = false;
        let name = document.getElementById("nPl3");
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nPl3Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (nPl4.length !== 0 && checkName(nPl4)) {
        isValid = false;
        let name = document.getElementById("nPl4");
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        document.getElementById('nPl4Error').style.display = "block"
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
    }

    if (isValid) {
        const loader = document.getElementById("load");
        loader.style.display = "grid";
        let data = JSON.parse(localStorage.getItem('data'));

        if (teamName.length !== 0) {
            data.teamInformation.teamName = teamName;
        }

        if (nPl1.length !== 0) {
            data.teamInformation.player1.nPl1 = nPl1;
        }

        if (rPl1.length !== 0) {
            data.teamInformation.player1.rPl1 = rPl1;
        }

        if (nPl2.length !== 0) {
            data.teamInformation.player2.nPl2 = nPl2;
        }

        if (rPl2.length !== 0) {
            data.teamInformation.player2.rPl2 = rPl2;
        }

        if (nPl3.length !== 0) {
            data.teamInformation.player3.nPl3 = nPl3;
        }

        if (rPl3.length !== 0) {
            data.teamInformation.player3.rPl3 = rPl3;
        }

        if (nPl4.length !== 0) {
            data.teamInformation.player4.nPl4 = nPl4;
        }

        if (rPl4.length !== 0) {
            data.teamInformation.player4.rPl4 = rPl4;
        }

        localStorage.setItem('data', JSON.stringify(data));

        setTimeout(()=>{
            const loader = document.getElementById("load");
            loader.style.display = "none";
        },1000)


    }

}


// const persButton = (e) => {
//     let name = document.getElementById("name").value.trim();
//     let phone = document.getElementById("phone").value.trim();
//     let email = document.getElementById("email").value.trim();
//     let username = document.getElementById("username").value.trim();
//     let password = document.getElementById("password").value.trim();
//     let cPassword = document.getElementById("cPassword").value.trim();

//     const arr = ["male", "female", "other"];
//     let gender;
//     arr.forEach((gen) => {
//         if (document.getElementById(gen).checked) {
//             gender = gen;
//         }

//     });




//     let isValid = true;

//     // Validation function for name
//     const checkName = () => {

//         for (let char of name) {
//             if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === " ")) {
//                 return true;
//             }
//         }

//     }



//     if(e.target.id === "name")
//     {
//         name = name+e.key;
//     }

//     if (name.length === 0 || checkName()) {
//         isValid = false;
//     }

//     if(e.target.id === "phone")
//     {
//         phone = phone+e.key;
//     }


//     if (phone.length === 0 || (phone.includes('e') || phone.includes('E') || isNaN(phone) || phone.length !== 10)) {
//         isValid = false;
//     }

//     //Validation function for email
//     const checkEmail = () => {

//         if (!email) {
//             return false;
//         }

//         if (email.includes(" ")) {
//             return false;
//         }

//         const atIndex = email.indexOf('@');
//         if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
//             return false;
//         }

//         const dotIndex = email.indexOf('.', atIndex);
//         if (dotIndex === -1 || dotIndex === atIndex + 1 || dotIndex === email.length - 1) {
//             return false;
//         }

//         const lastIndex = email.length - 1;

//         if (email.charAt(lastIndex) === "@" || email.charAt(lastIndex) === ".") {
//             return false;
//         }

//         return true;
//     }

//     if(e.target.id === "email")
//     {
//         email = email+e.key;
//     }

//     if (email.length === 0 || !checkEmail()) {
//         isValid = false;
//     }

//     if(e.target.id === "username")
//     {
//         username = username+e.key;
//     }

//     if (username.length === 0 || (username.length < 3 || username.includes(" "))) {
//         isValid = false;
//     }

//     // Validating function for password for having atleast one character,both cases and digit.
//     const checkPassword = () => {
//         let hasUpperCase = false;
//         let hasLowerCase = false;
//         let hasDigit = false;
//         let hasSpecialChar = false;

//         for (let char of password) {
//             if (char >= 'A' && char <= 'Z') {
//                 hasUpperCase = true;
//             } else if (char >= 'a' && char <= 'z') {
//                 hasLowerCase = true;
//             } else if (char >= '0' && char <= '9') {
//                 hasDigit = true;
//             } else {
//                 hasSpecialChar = true;
//             }
//         }

//         return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
//     }

//     document.getElementById('passError').style.display = "none";
//     document.getElementById('cPassError').style.display = "none";

//     if(e.target.id === "password")
//     {
//         password = password+e.key;
//     }

//     if (password.length === 0 || (password.length < 5 || !checkPassword())) {
//         isValid = false;
//     }

//     if(e.target.id === "cPassword")
//     {
//         cPassword = cPassword+e.key;
//     }

//     if (password !== cPassword) {
//         isValid = false;
//     }

//     if (isValid) {
//         alert("enable");
//     }
//     else{
//         alert("disable")
//     }



// }


const validateName = (e, vname, error) => {
    document.getElementById(error).style.display = 'none';
    const name = document.getElementById(vname);
    name.style.border = "none"

    if (!((e.key >= "A" && e.key <= "Z") || (e.key >= "a" && e.key <= "z")) && e.key !== " ") {
        // document.getElementById('nameError').style.display = 'block';
        name.style.animation = "vibrate 0.1s linear 5 alternate";
        name.style.border = "1px solid var(--tertiaryColor)";
        name.addEventListener("animationend", (e) => e.target.style.animation = '');
        event.preventDefault();
    }
}

const validatePhone = (e) => {
    const phone = document.getElementById("phone");

    document.getElementById('phoneError').style.display = 'none';
;
    phone.style.border = "none"
    if (isNaN(e.key) || e.key === " ") {
        // document.getElementById('phoneError').style.display = 'block';
        phone.style.animation = "vibrate 0.1s linear 5 alternate";
        phone.style.border = "1px solid var(--tertiaryColor)"
        phone.addEventListener("animationend", (e) => e.target.style.animation = '');
        event.preventDefault();
    }

    if (e.target.value.length === 10) {
        event.preventDefault();
    }
}

const validateEmail = (e) => {
    document.getElementById('emailError').style.display = 'none';
    const email = document.getElementById("email");
    email.style.border = "none"
    if (e.key === " ") {
        document.getElementById('emailError').style.display = 'block';
        email.style.animation = "vibrate 0.1s linear 5 alternate";
        email.style.border = "1px solid var(--tertiaryColor)"
        email.addEventListener("animationend", (e) => e.target.style.animation = '');
        event.preventDefault();
    }
}

const validateUser = (e, userName, userError) => {
    document.getElementById(userError).style.display = 'none';
    const user = document.getElementById(userName);
    user.style.border = "none"
    if (e.key === " ") {
        user.style.animation = "vibrate 0.1s linear 5 alternate";
        user.style.border = "1px solid var(--tertiaryColor)"
        user.addEventListener("animationend", (e) => e.target.style.animation = '');
        event.preventDefault();
    }
}

const validatePassword = (e) => {
    document.getElementById('passError').style.display = 'none';
    const password = document.getElementById("password");
    password.style.border = "none"
    if (e.key === " ") {
        document.getElementById('passError').innerHTML = "Password can't contain spaces";
        document.getElementById('passError').style.display = 'block';
        password.style.animation = "vibrate 0.1s linear 5 alternate";
        password.style.border = "1px solid var(--tertiaryColor)"
        password.addEventListener("animationend", (e) => e.target.style.animation = '');
        event.preventDefault();
    }
}

const validateCPassword = (e) => {
    document.getElementById('cPassError').style.display = 'none';
    const cpassword = document.getElementById("cPassword");
    cpassword.style.border = "none"
    if (e.key === " ") {
        document.getElementById('cPassError').innerHTML = "Password can't contain spaces";
        document.getElementById('cPassError').style.display = 'block';
        cpassword.style.animation = "vibrate 0.1s linear 5 alternate";
        cpassword.style.border = "1px solid var(--tertiaryColor)"
        cpassword.addEventListener("animationend", (e) => e.target.style.animation = '');
        event.preventDefault();
    }
}

document.querySelectorAll("input").forEach((tag) => {
    tag.addEventListener("focusout", (event) => {
        event.target.style.border = "none";
        document.querySelector(`#${event.target.attributes.id.nodeValue}+.error`).style.display = "none"
    })
})


const passShow = (e)=>{

   if(e.target.id === "passHide")
   {
    document.getElementById('password').type = "text";
    e.target.style.display = "none";
    document.getElementById("passView").style.display="block"
   }
   else{
    document.getElementById('password').type = "password";
    e.target.style.display = "none";
    document.getElementById("passHide").style.display="block"
   }
}


const cPassShow = (e)=>{

    if(e.target.id === "cPassHide")
    {
     document.getElementById('cPassword').type = "text";
     e.target.style.display = "none";
     document.getElementById("cPassView").style.display="block"
    }
    else{
     document.getElementById('cPassword').type = "password";
     e.target.style.display = "none";
     document.getElementById("cPassHide").style.display="block"
    }
 }


let crous = document.getElementsByClassName('crous');

const shiftLeft = () => {
    for (let i = 0; i < 3; i++) {
        let left = parseInt(crous[i].style.left.substring(0, crous[i].style.left.length - 1));

        if (left === 90) {
            crous[i].style.left = "0%"
            crous[i].style.transform = "translateX(50px) scale(1)"
        }
        else if (left === 0) {
            crous[i].style.left = `${(left + 10) - 100}%`;
            crous[i].style.transform = "translateX(50px) scale(0.9)"
        }
        else {
            crous[i].style.left = `${(left) - 100}%`;
            crous[i].style.transform = "translateX(50px) scale(0.9)"
        }

    }
}

const shiftRight = () => {
    for (let i = 0; i < 3; i++) {
        let left = parseInt(crous[i].style.left.substring(0, crous[i].style.left.length - 1));

        if (left === -90) {
            crous[i].style.left = `0%`;
            crous[i].style.transform = "translateX(50px) scale(1)"
        }
        else if (left === 0) {
            crous[i].style.left = `90%`;
            crous[i].style.transform = "translateX(50px) scale(0.9)"
        }
        else {
            crous[i].style.left = `${left + 100}%`;
            crous[i].style.transform = "translateX(50px) scale(0.9)"
        }
    }
}