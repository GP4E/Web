async function dsreq(dsurl,callback_success) {
    var t = window.localStorage.getItem("discord_token")
    return (await $.ajax({
        url: 'https://api.github.com/'+gurl,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.setRequestHeader("Authorization", "token "+t)
            /*Array.from(headers).forEach(m=>{
                xhr.setRequestHeader(m.type,m.content)
            })*/
        },
        success: function (data) {
            callback_success(data)
        }
    }))
}