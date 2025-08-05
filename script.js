let editingIndex = null;

function send() {
    const arr = {};
    const contain = [];

    const surname = document.getElementById('surname').value;
    contain.push(surname);

    const age = document.getElementById('age').value;
    contain.push(age);

    const email = document.getElementById('email').value;
    contain.push(email);

    const password = document.getElementById('password').value;
    contain.push(password);

    const first_name = document.getElementById('name').value;
    arr[first_name] = contain;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(arr);
    localStorage.setItem('users', JSON.stringify(users));

    displayusers();
    document.getElementById('form').reset(); // Reset form after saving
}

function displayusers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach((user, index) => {
        for (const first_name in user) {
            const [surname, age, email, password] = user[first_name];

            result.innerHTML += `
                <div class="work">
                    <a class="edit" onclick="editUser(${index})"><img src="edit.png" alt="Edit"></a>
                    <a class="delete" onclick="remove(${index})"><img src="delete.svg" alt="Delete"></a>
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

function allnames() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach((user, index) => {
        for (const first_name in user) {
            const [surname] = user[first_name];

            result.innerHTML += `
                <div class="work">
                    <a class="edit" onclick="editUser(${index})"><img src="edit.png" alt="Edit"></a>
                    <a class="delete" onclick="remove(${index})"><img src="delete.svg" alt="Delete"></a>
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Name:</strong> ${first_name} ${surname}<br>
                    <hr>
                </div>
            `;
        }
    });
}

function allemails() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach((user, index) => {
        for (const first_name in user) {
            const [surname, age, email, password] = user[first_name];

            result.innerHTML += `
                <div class="work">
                    <a class="edit" onclick="editUser(${index})"><img src="edit.png" alt="Edit"></a>
                    <a class="delete" onclick="remove(${index})"><img src="delete.svg" alt="Delete"></a>
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Email:</strong> ${email}<br>
                    <hr>
                </div>
            `;
        }
    });
}

function allages() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach((user, index) => {
        for (const first_name in user) {
            const [surname, age, email, password] = user[first_name];

            result.innerHTML += `
                <div class="work">
                    <a class="edit" onclick="editUser(${index})"><img src="edit.png" alt="Edit"></a>
                    <a class="delete" onclick="remove(${index})"><img src="delete.svg" alt="Delete"></a>
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Age:</strong> ${age}<br>
                    <hr>
                </div>
            `;
        }
    });
}

function allpasswords() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const result = document.getElementById('result');
    result.innerHTML = '';

    users.forEach((user, index) => {
        for (const first_name in user) {
            const [surname, age, email, password] = user[first_name];

            result.innerHTML += `
                <div class="work">
                    <a class="edit" onclick="editUser(${index})"><img src="edit.png" alt="Edit"></a>
                    <a class="delete" onclick="remove(${index})"><img src="delete.svg" alt="Delete"></a>
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Password:</strong> ${password}<br>
                    <hr>
                </div>
            `;
        }
    });
}

function remove(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayusers();
}

function editUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userObj = users[index];

    for (const firstName in userObj) {
        const [surname, age, email, password] = userObj[firstName];

        document.getElementById('name').value = firstName;
        document.getElementById('surname').value = surname;
        document.getElementById('age').value = age;
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;

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
    const updatedUser = {};
    updatedUser[first_name] = [surname, age, email, password];

    users[editingIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));

    editingIndex = null;
    document.getElementById('form').reset();
    displayusers();
}

function submitForm() {
    if (editingIndex === null) {
        send();
    } else {
        update();
    }
}

const ageInput = document.getElementById("age");
ageInput.addEventListener("input", () => {
    ageInput.value = ageInput.value.replace(/\D/g, "").slice(0, 2);
    if (ageInput.value !== "") {
        const age = parseInt(ageInput.value, 10);
        if (age < 1) ageInput.value = "1";
        if (age > 99) ageInput.value = "99";
    }
});

window.onload = displayusers;