const login_url = "http://localhost:5000/login";

document.getElementById("signin").addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const response = await fetch(login_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }) //convert from js object to JSON
        })

        console.log(response);
        
        const data = await response.json();

        if (data.success) {
            window.location.href = "index.html";
        }
        else {
            alert("not a valid login or password");
        }

        console.log(data.message);
    }

    catch (e) {
        console.log(e);
    }
}

);

