async function setupGitGraphicsPage(element) {
    element.innerHTML = '<span class="awaitloading">Stiamo caricando la pagina.</span>'
    var res = ""
    var tree = await req("repos/GP4E/GP4EGame/git/trees/ea035f6f977e1d3c86623e7c2522592c277e2872",(x)=>{console.log(x)})
    var trhtml = document.createElement("div")
    analyze(tree).forEach(e=>trhtml.appendChild(e))
    trhtml.classList.add("github_path_tree")
    element.appendChild(trhtml)
}

async function req(gurl, callback_success) {
    var t = window.localStorage.getItem("github_token")
    return (await $.ajax({
        url: 'https://api.github.com/'+gurl,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "application/vnd.github+json")
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

function analyze(t) {
    var treepath = Array.from(t.tree)
    var res = treepath.map(p=>{
        var item = document.createElement("div")
        item.classList.add("item")
        item.classList.add("github_item_type_"+p.type)
        var img=document.createElement("div")
        img.classList.add("github_item_icon")
        switch (p.type) {
            case "blob":
                img.setAttribute("src","./icons/file.svg")
                break;
            case "tree":
                img.setAttribute("src","./icons/tree.svg")
                break;
            default:
                img.style.display="hidden"
        }
        var label=document.createElement("div")
        label.classList.add("github_item_label")
        label.innerText=p.path
        label.setAttribute("sha",p.sha)
        label.setAttribute("mode",p.mode)
        label.setAttribute("url",p.url)
        item.appendChild(img)
        item.appendChild(label)
        item.addEventListener("click", (c)=>{document.dispatchEvent(new Event("github_navigate_to",{item: p}))})
        return item
    })
    return res
}