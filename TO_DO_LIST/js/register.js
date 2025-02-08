const register_url = "http://localhost:5000/register";

document.getElementById("signup").addEventListener("click", async function(event){
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;

    //TODO!!!!!!!!!!!!!! - if email already exist return/alert the user "u already have an account"
    
    if (password === confirmPassword) {
        
        const response = await fetch(register_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),    //send a JSON object
        });

        const data = await response.json();   //we will receive a data which is js object

        if (data.success) {
            alert("successfully create an account! Now, try to login!");
        }
        else {
            console.error(data.error);
        }
    }
    else {
        alert("Password do not match with confirm passowrd");
    }
    
})
