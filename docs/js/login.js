var url = "https://github.com/login/oauth/authorize?scope=user:email&client_id=d88f20c54b921644c506"
function checkLogin() {
    var lgb = document.getElementsByClassName("loginbtn")[0]
    var t = window.localStorage.getItem("github_token")
    
    if (
        query().length==0||
        query().length==undefined||
        query().length==null||
        query()=={}) {
        switch (t) {
            case null:
                lgb.addEventListener("click", (e)=>{
                    this.window.name="gp4ehome"
                    var w = window.open("./loginform.html","","popup")
                    
                })
                break;
            default:
                break;
        }
    } else {

    }
}

