var url = "https://github.com/login/oauth/authorize?scope=user:email&client_id=d88f20c54b921644c506"
function checkLogin() {
    var lgb = document.getElementsByClassName("loginbtn")[0]
    var t = window.localStorage.getItem("github_token")
    var q = query()
    if (
        q.length==0||
        q.length==undefined||
        q.length==null||
        q=={}||
        notValid(q)
    ) {
        switch (t) {
            case null:
            case "":
            case undefined:
                lgb.addEventListener("click", (e)=>{
                    this.window.name="gp4ehome"
                    var w = window.open("./loginform.html","","popup")
                    //w.document.addEventListener("load",(ee)=>w.document.getElementById("loginform").setAttribute("action",this.window.location.origin+this.window.location.pathname))
                })
                break;
            default:
                break;
        }
    } else {

    }
}

function notValid(qu) {
    var username = qu.username
    var email = qu.email
    var token = qu.token
    var re = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@gmail.com/i)
    var rt = new RegExp(/[A-Za-z0-9_]*/i)
    if (
        //user
        username.length>0&&
        //email
        re.test(email)&&
        //token
        rt.test(token)
    ) return false
    else return true
}