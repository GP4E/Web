var url = "https://github.com/login/oauth/authorize?scope=user:email&client_id=d88f20c54b921644c506"
function checkLogin() {
    var lgb = document.getElementsByClassName("loginbtn")[0]
    var t = window.localStorage.getItem("github_token")
    if (t==null) {
        
    }
    switch (t) {
        case null:
            var w = window.open("","","popup")
            this.window.name="home"
            var x = document.createElement("form")
            x.id="f"
            x.target="home"
            w.document.body.innerHTML=""
            w.document.body.appendChild(x)
            console.log(nt)
            window.localStorage.setItem("github_token",nt)
            break;
    
        default:
            break;
    }
}