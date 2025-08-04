let editingIndex = null;


function send() {
    const arr = {};
    const contain = [];

    const surname = document.getElementById('surname');
    const second_name = surname.value;
    contain.push(second_name);

    const age = document.getElementById('age');
    const user_age = age.value;
    contain.push(user_age);

    const email = document.getElementById('email');
    const email_data = email.value;
    contain.push(email_data);

    const password = document.getElementById('password');
    const password_value = password.value;
    contain.push(password_value);

    const firstname = document.getElementById('name');
    const first_name = firstname.value;
    arr[first_name] = contain;


    // ❌ Incorrect: json.parse — should be JSON.parse
    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.push(arr); // Push the new user

    localStorage.setItem('users', JSON.stringify(users));

    displayusers(); // Refresh the display
}

function displayusers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach((user, index) => {
    for (const first_name in user) {
        const [surname, age, email, password] = user[first_name];

        result.innerHTML += `
            <div class='kaam'>
                <a id='edit' onclick='editUser(${index})'><img src="edit.png" alt=""></a>
                <a id='delete' onclick='remove(${index})'><img src="delete.svg" alt=""></a>
            </div>
            <div style="margin-bottom: 10px;">
                <strong>Name:</strong> ${first_name} ${surname}<br>
                <strong>Age:</strong> ${age}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Password:</strong> ${password}<br>
                <hr>
            </div>
        `;
    }
});

}


window.onload = displayusers;



const ageInput = document.getElementById("age");

ageInput.addEventListener("input", () => {
  // Remove non-digits and cut to 2 characters
  ageInput.value = ageInput.value.replace(/\D/g, "").slice(0, 2);

  // Ensure age stays within 1–99
  if (ageInput.value !== "") {
    const age = parseInt(ageInput.value, 10);
    if (age < 1) ageInput.value = "1";
    if (age > 99) ageInput.value = "99";
  }
});




// async function data(){
//   const poke = document.getElementById('poke').value;
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
//   const jsondata = await response.json()
//   const answer = document.getElementById('answer')
//   answer.textContent = `This Pokemon is ${jsondata.name} whose height is ${jsondata.height} inches and weight is ${jsondata.weight} Kgs`
//   // answer.textContent = JSON.stringify(jsondata , null , 2)
// }


function allnames(){
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach(user => {
        for (const first_name in user) {
            const [surname] = user[first_name];

            result.innerHTML += `
                <div class='kaam'>
                    <a id='edit' onclick='editUser(${index})'><img src="edit.png" alt=""></a>
                    <a id='delete' onclick='remove()'><img src="delete.svg" alt=""></a>
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Name:</strong> ${first_name} ${surname}<br>
                    <hr>
                </div>
            `;
        }
    });
}



function allemails(){
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach(user => {
        for (const first_name in user) {
            const [surname , age , email , password] = user[first_name];

            result.innerHTML += `
                <div class='kaam'>
                    <a id='edit' onclick='editUser(${index})'><img src="edit.png" alt=""></a>
                    <a id='delete' onclick='remove()'><img src="delete.svg" alt=""></a>
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Email:</strong> ${email}<br>
                    <hr>
                </div>
            `;
        }
    });
}


function allages(){
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach(user => {
        for (const first_name in user) {
            const [surname , age , email , password] = user[first_name];

            result.innerHTML += `
                <div class='kaam'>
                    <a id='edit' onclick='editUser(${index})'><img src="edit.png" alt=""></a>
                    <a id='delete' onclick='remove()'><img src="delete.svg" alt=""></a>
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Age:</strong> ${age}<br>
                    <hr>
                </div>
            `;
        }
    });
}





function allpasswords(){
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach(user => {
        for (const first_name in user) {
            const [surname , age , email , password] = user[first_name];

            result.innerHTML += `
                <div class='kaam'>
                    <a id='edit' onclick='editUser(${index})'><img src="edit.png" alt=""></a>
                    <a id='delete' onclick='remove()'><img src="delete.svg" alt=""></a>
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Password:</strong> ${password}<br>
                    <hr>
                </div>
            `;
        }
    });
}


function remove(index){
    const users = JSON.parse(localStorage.getItem('users')) || [];


    users.splice(index , 1)


    localStorage.setItem('users' , JSON.stringify(users))
    
    displayusers()


}


function editUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userObj = users[index];

    for (const firstName in userObj) {
        const [surname, age, email, password] = userObj[firstName];

        // Fill form fields
        document.getElementById('name').value = firstName;
        document.getElementById('surname').value = surname;
        document.getElementById('age').value = age;
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;

        // Store current index globally for update
        editingIndex = index;
    }
}




function update() {
    if (editingIndex === null) return;

    const first_name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Build updated user object (same format)
    const updatedUser = {};
    updatedUser[first_name] = [surname, age, email, password];

    // Replace the user at the index
    users[editingIndex] = updatedUser;

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Reset editingIndex
    editingIndex = null;

    // Clear form (optional)
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('age').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    displayusers();
}

function submitForm() {
    if (editingIndex === null) {
        send(); // Add new
    } else {
        update(); // Update existing
    }
}
