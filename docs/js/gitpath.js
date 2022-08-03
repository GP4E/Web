function setupGitGraphicsPage(element) {
    var res = ""
    console.log()
    
    element.innerHTML=res
}

function req(gurl, headers, callback_success) {
    var t = window.localStorage.getItem("github_token")
    $.ajax({
        url: 'https://api.github.com/'+gurl,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "application/vnd.github+json")
            xhr.setRequestHeader("Authorization", "token "+t)
            Array.from(headers).forEach(m=>{
                xhr.setRequestHeader(m.type,m.content)
            })
        },
        success: function (data) {
            callback_success(data)
        }
    })
}