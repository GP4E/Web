var url = "https://github.com/login/oauth/authorize?scope=user:email&client_id=d88f20c54b921644c506"
function checkLogin() {
    var lgb = document.getElementsByClassName("loginbtn")[0].children[0]
    var t = window.localStorage.getItem("github_token")
    var q = getInfo(query())
    if (
        notValid(q)
    ) {
        switch (t) {
            case null:
            case "":
            case undefined:
                lgb.addEventListener("click", (e)=>{
                    e.srcElement.ownerDocument.defaultView.name="gp4ehome"
                    var w = window.open("./loginform.html","","popup")
                    //dw.document.addEventListener("load",(ee)=>w.document.getElementById("loginform").setAttribute("action",this.window.location.origin+this.window.location.pathname))
                })
                break;
            default:
                setupPage()
        }
    } else {
        console.log("set item")
        window.localStorage.setItem("github_token",q.github_token)
        window.localStorage.setItem("google_token",q.google_token)
        window.localStorage.setItem("username",q.username)
        window.localStorage.setItem("email",q.email.toLowerCase())
        console.log("done")
        setupPage()
    }
}

function notValid(qu) {
    var username = qu.username || ""
    var email = qu.email || ""
    var github_token = qu.github_token || ""
    var google_token = qu.google_token || ""
    var re = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@gmail.com/i)
    var rt = new RegExp(/[A-Za-z0-9_]*/i)
    var rgooglet = new RegExp()
    if (
        //user
        username.length>0&&
        //email
        re.test(email)&&
        //github_token
        rt.test(github_token)&&
        //google_token
        rgooglet.test(google_token)
    ) return false
    return true
}
function setupPage() {
    console.log("Start")
    var t = window.localStorage.getItem("github_token")
    
    $.ajax({
        url: 'https://api.github.com/user',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Accept", "pplication/vnd.github+json")
            xhr.setRequestHeader("Authorization", "token "+t)
        },
        success: function (us) {
            var username = us.login
            var id = us.id
            var avatar = us.avatar_url
            var usurl = us.html_url
            var email = us.email
            var page = document.getElementsByClassName("user")[0]
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
            console.log("end")

        }
    })
}
function getInfo(def) {
    var x = def
    if (nou(def.username)) {
       def.username=window.localStorage.getItem("username")
    }
    if (nou(def.email)) {
        def.email=window.localStorage.getItem("email")
    }
    if (nou(def.github_token)) {
        def.github_token=window.localStorage.getItem("github_token")
    }
    if (nou(def.google_token)) {
        def.google_token=window.localStorage.getItem("google_token")
    }
    return x
}
//document.addEventListener("load",(m)=>checkLogin())
