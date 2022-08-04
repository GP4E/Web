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
        var img=document.createElement("svg")
        img.classList.add("github_item_icon")
        img.setAttribute("width","16")
        img.setAttribute("height","16")
        img.setAttribute("viewBox","0 0 16 16")
        img.setAttribute("version","1.1")
        switch (p.type) {
            case "blob":
                img.innerHTML='<path fill-rule="evenodd" d="M3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011zM2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z"></path>'
                break;
            case "tree":
                img.innerHTML='<path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path>'
                break;
            default:
                // img.style.display="hidden"
        }
        var label=document.createElement("div")
        label.classList.add("github_item_label")
        label.innerText=p.path
        label.setAttribute("sha",p.sha)
        label.setAttribute("mode",p.mode)
        label.setAttribute("url",p.url)
        var commitchanges = document.createElement("div")
        commitchanges.classList.add("github_item_commitchanges")
        var size = document.createElement("div")
        size.classList.add("github_item_size")
        if (!nou(p.size)) size.innerHTML=p.size
        item.appendChild(img)
        item.appendChild(label)
        item.appendChild(commitchanges)
        item.appendChild(size)
        item.addEventListener("click", (c)=>{document.dispatchEvent(new Event("github_navigate_to",{item: p}))})
        return item
    })
    return res
}