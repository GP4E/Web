function setupGitGraphicsPage(element) {
    var res = ""
    console.log()
    
    element.innerHTML=res
}

function req(gurl,callback_success) {
    var t = window.localStorage.getItem("github_token")
    $.ajax({
        url: 'https://api.github.com/'+gurl,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Accept", "pplication/vnd.github+json")
            xhr.setRequestHeader("Authorization", "token "+t)
        },
        success: function (data) {
            callback_success(data)
        }
    })
}