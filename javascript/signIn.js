
document.getElementById("signIn-btn").addEventListener("click",function(){
    // console.log("signIn button clicked");

    // 1.get the username input
    const nameInput = document.getElementById("input-Username");
    const username = nameInput.value;
    console.log(username);
    // 2.get the password 
    const passInput = document.getElementById("input-password");
    const password = passInput.value;
    console.log(password);
    // 3.match the username and password
    if(username=="admin" && password=="admin123"){
        alert("Sign In successful");
    }
    else{
        alert("Sign In failed");
        return;
    }
})
