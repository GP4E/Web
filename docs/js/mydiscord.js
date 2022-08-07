async function dsreq(dsurl,callback_success) {
    var t = window.localStorage.getItem("discord_token")
    return (await $.ajax({
        url: 'https://discord.com/api/webhooks/1005863439685668914/EV7WlCmhzWC14XJGKdo55GG8xcp_kx73lIeiU4B6GmLsCI3s9CN-glzyj60dTKSplz-Q/'+gurl,
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