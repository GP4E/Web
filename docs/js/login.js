import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

var url = "https://github.com/login/oauth/authorize?scope=user:email&client_id=d88f20c54b921644c506"
export default function checkLogin() {
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
                setupPage()
        }
    } else {
        window.localStorage.setItem("github_token",q.token)
        window.localStorage.setItem("username",q.username)
        window.localStorage.setItem("email",q.email.toLowerCase())
        setupPage()
    }
}

export default function notValid(qu) {
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
export default async function setupPage() {
    var t = window.localStorage.getItem("github_token")
    var oc = new Octokit({
        auth: t
    })
    var us = await oc.request("GET /user")
    var username = us.login
    var id = us.id
    var avatar = us.avatar_url
    var usurl = us.url
    var email = us.email
    var page = document.getElementsByClassName("page")[0]
    var profileinfo = document.createElement("div")
    profileinfo.style.display="flex"
    profileinfo.style.flexDirection="row"
        var pimg = document.createElement("img")
        pimg.style.borderRadius="50%"
        pimg.style.width = "128px"
        pimg.style.height = "128px"
        pimg.style.padding = "32px"
        //pimg.style.flexGrow=3
        pimg.src=avatar
    profileinfo.appendChild(pimg)
        var usleft = document.createElement("div")
        usleft.style.paddingTop="16px"
        usleft.style.display="flex"
        usleft.style.flexDirection="column"
            var usname = document.createElement("a")
            usname.style.fontSize = "32px"
            usname.style.color = "#222222"
            usname.innerHTML=username
            usname.href = usurl
        usleft.appendChild(usname)
            var usmail = document.createElement("span")
            usmail.style.fontSize = "24px"
            usmail.style.color = "#555555"
            usmail.innerHTML=username
        usleft.appendChild(usmail)
    profileinfo.appendChild(usleft)
    page.appendChild(profileinfo)

}

//document.addEventListener("load",(m)=>checkLogin())