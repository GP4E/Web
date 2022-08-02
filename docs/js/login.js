var url = "https://github.com/login/oauth/authorize?scope=user:email&client_id=d88f20c54b921644c506"
function checkLogin() {
    var lgb = document.getElementsByClassName("loginbtn")[0]
    var t = window.localStorage.getItem("github_token")
    
    if (t==null) {
        
    }
    switch (t) {
        case null:
            var w = window.open("./loginform.html","","popup")
            this.window.name="gp4ehome"
            break;
    
        default:
            break;
    }
}

