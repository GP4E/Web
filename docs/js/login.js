var url = "https://github.com/login/oauth/authorize?scope=user:email&client_id=d88f20c54b921644c506"
function checkLogin() {
    var lgb = document.getElementsByClassName("loginbtn")[0]
    var t = window.localStorage.getItem("github_token")
    var q = query()
    if (
        q.length==0||
        q.length==undefined||
        q.length==null||
        q=={}
    ) {
        switch (t) {
            case null:
            case "":
            case undefined:
                lgb.addEventListener("click", (e)=>{
                    this.window.name="gp4ehome"
                    var w = window.open("./loginform.html","","popup")
                    w.document.getElementById("loginform").setAttribute("action",window.location.origin+window.location.pathname)
                })
                break;
            default:
                break;
        }
    } else {

    }
}

