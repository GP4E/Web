var url = "https://github.com/login/oauth/authorize?scope=user:email&client_id=d88f20c54b921644c506"
function checkLogin() {
    var t = window.localStorage.getItem("github_token")
    if (t==null) {
        var nt = prompt("Github Token")
        console.log(nt)
        window.localStorage.setItem("github_token",nt)
    }
}