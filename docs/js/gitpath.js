async function setupGitGraphicsPage(element) {
    document.addEventListener("github_navigate_to", async (e)=>{
        var i = e.detail
        console.log("i: ", i)
        document.getElementsByClassName("page")[0].innerHTML=""
        var div = document.createElement("div")
        div.classList.add("github_path_tree")
        

        switch (i.type) {
            case "tree":
                analyze([{
                    "sha": "ea035f6f977e1d3c86623e7c2522592c277e2872",
                    "url": "https://api.github.com/repos/GP4E/GP4EGame/git/trees/ea035f6f977e1d3c86623e7c2522592c277e2872",
                    "path": "Home",
                    "type": "home",
                    "mode": "040000",
                }]).forEach(x=>{div.appendChild(x);console.log(x)})
                var tree = await req("repos/GP4E/GP4EGame/git/trees/"+i.sha,(x)=>{console.log(x)})
                analyze(tree.tree).forEach(lul=>div.appendChild(lul))
                break;
            case "home":
                var tree = await req("repos/GP4E/GP4EGame/git/trees/ea035f6f977e1d3c86623e7c2522592c277e2872",(x)=>{console.log(x)})
                analyze(tree.tree).forEach(eue=>div.appendChild(eue))
                break;
            case "blob":
                console.log(i.type)
                var file = await req("repos/GP4E/GP4EGame/git/blobs/"+i.sha,(x)=>console.log(x))
                var b = blob(file,i)
                div.appendChild(b)
                break;
        }
        document.getElementsByClassName("page")[0].appendChild(div)
    })
    element.innerHTML = '<span class="awaitloading">Stiamo caricando la pagina.</span>'
    var tree = await req("repos/GP4E/GP4EGame/git/trees/ea035f6f977e1d3c86623e7c2522592c277e2872",(x)=>{console.log(x)})
    var trhtml = document.createElement("div")
    analyze(tree.tree).forEach(e=>trhtml.appendChild(e))
    trhtml.classList.add("github_path_tree")
    element.innerHTML=""
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
    var treepath = Array.from(t).sort((a,b)=>{
        switch (a.type) {
            case "blob":
                switch (b.type) {
                    case "blob":
                        return a.path.localeCompare(b.path)
                        break;
                    case "home":
                    case "tree":
                        return 1
                    default:
                        return 0;
                }
                break;
            case "home":
            case "tree":
                switch (b.type) {
                    case "blob":
                        return -1
                        break;
                    case "home":
                    case "tree":
                        return a.path.localeCompare(b.path)
                    default:
                        return 0;
                }
                break;
            default:
                return 0;
        }
    })
    var res = treepath.map(p=>{
        var item = document.createElement("div")
        item.classList.add("item")
        item.classList.add("github_item_type_"+p.type)
        var img=document.createElementNS("http://www.w3.org/2000/svg", "svg");
        img.classList.add("github_item_icon")
        img.setAttribute("width","16")
        img.setAttribute("height","16")
        img.setAttribute("version","1.1")
        switch (p.type) {
            case "blob":
                img.setAttribute("viewBox","0,0,16,16") 
                var pa = document.createElementNS("http://www.w3.org/2000/svg","path");
                pa.style.fillRule="evenodd"
                pa.setAttribute("d","M3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011zM2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z")
                img.appendChild(pa)
                break;
            case "tree":
                img.setAttribute("viewBox","0,0,16,16")
                var pa = document.createElementNS("http://www.w3.org/2000/svg","path");
                pa.setAttribute("d","M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z")
                img.appendChild(pa)
                break;
            case "home":
                img.setAttribute("viewBox","12.5,12.5,25,25")
                var pa = document.createElementNS("http://www.w3.org/2000/svg","path");
                pa.setAttribute("d","M40.348,23.401l-15-10.909c-0.351-0.256-0.826-0.256-1.177,0l-15,10.909c-0.446,0.324-0.545,0.95-0.22,1.396  c0.325,0.447,0.949,0.544,1.397,0.221l1.974-1.436v13.718c0,0.553,0.448,1,1,1h8.075c0.552,0,1-0.447,1-1v-9.393h4.725v9.393  c0,0.553,0.448,1,1,1h8.075c0.552,0,1-0.447,1-1V23.583l1.974,1.436c0.178,0.129,0.384,0.191,0.587,0.191  c0.309,0,0.614-0.143,0.81-0.412C40.894,24.352,40.794,23.726,40.348,23.401z M35.197,36.301h-6.075v-9.393c0-0.553-0.448-1-1-1  h-6.725c-0.552,0-1,0.447-1,1v9.393h-6.075V22.128l10.438-7.591l10.438,7.591V36.301z")
                img.appendChild(pa)
                break;
            default:
                // img.style.display="hidden"
                break;
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
        if (!nou(p.size)) size.innerHTML=parseSize(p.size)
        item.appendChild(img)
        item.appendChild(label)
        item.appendChild(commitchanges)
        item.appendChild(size)
        item.addEventListener("click", (c)=>{document.dispatchEvent(new CustomEvent("github_navigate_to",{detail: p}))})
        return item
    })
    console.log("analyze\n",t,treepath,res)
    return res
}

function blob(f,i) {
    var div = document.createElement("div")
    div.classList.add("github_blob")
    var fi = decode(f,i)
    div.appendChild(fi.element)
    div.appendChild(createDetailsBlob(fi))
    return div
}

function decode(base,item) {
    var det = detailsbase64(base)
    var d = document.createElement("div") 
    d.classList.add("github_blob")
    d.classList.add("github_blob_"+det.type)
    var str = atob(base.content)
    var ls = str.split("\n")
    var l = ls.length
    switch (det.type) {
        case "code":
        case "txt":
            var y = document.createElement("table")
            y.addEventListener("test_codebox", e=>{
                var x = e.detail
                var y = e.target
                y.innerHTML("")
                Array.from(x.content.split("\n")).forEach((v,i)=>{
                    var ln = document.createElement("td")
                    ln.classList.add("github_blob_txt_table_line_num")
                    var lc = document.createElement("td")
                    lc.classList.add("github_blob_txt_table_line_ctn")
                    ln.innerHTML=(i+1)
                    lc.innerHTML=parse(v,x.extension)
                    var tr = document.createElement("tr")
                    tr.appendChild(ln)
                    tr.appendChild(lc)
                    y.appendChild(tr)
                })
            })
            y.classList.add("github_blob_txt_table")
            Array.from(ls).forEach((v,i)=>{
                var ln = document.createElement("td")
                ln.classList.add("github_blob_txt_table_line_num")
                var lc = document.createElement("td")
                lc.classList.add("github_blob_txt_table_line_ctn")
                ln.innerHTML=(i+1)
                lc.innerHTML=parse(v,det.extension)
                var tr = document.createElement("tr")
                tr.appendChild(ln)
                tr.appendChild(lc)
                y.appendChild(tr)
            })
            d.appendChild(y)
            // var md = "javascript"
            // switch (det.extension) {
            //     case "js":
            //         md = "javascript"
            //     default:
            //         md = "javascript"
            // }
            // d.addEventListener("load",(e)=>{
            //     CodeMirror(e.target, {
            //         lineNumbers: true,
            //         tabSize: 4,
            //         value: str,
            //         mode: md
            //     })
            // })
            break;
        case "img":           
            var y = new Image()
            y.src = "data:image/"+det.extension+";base64,"+base.content
            d.appendChild(y)
            break;
        default:
            break;
    }
    return {
        element: d,
        lines: l,
        base: base,
        item: item
    }
}
function detailsbase64(t) {
    console.log(t)
    var res = {}
    var c = t.content
    var first = (c+"").charAt(0)
    switch (first) {
        case '/':
            res.type="img"
            res.extension='jpeg';
            break;
        case 'i':
            res.type="img"
            res.extension='png';
            break;
        case 'R':
            res.type="img"
            res.extension='gif';
            break;
        case 'U':
            res.type="img"
            res.extension='webp';
            break;
        case 'J':
            res.type='img'
            res.extension='pdf';
            break;
        case 'O':
            res.type='img'
            res.extension='psd';
            break;
        //Text
        case 'Z':
            res.type='txt'
            res.extension='bat'
            break;
        case 'L':
            res.type='txt'
            res.extension='gitignore'
            break;
        //code
        case '7':
            res.type='code'
            res.extension='js'
        //Autocad
        case 'Q':
            res.type="autocad"
            res.extension="dwg"
        default:
            res.type="txt"
            res.extension='js';
            alert("Error: "+"Base64 type unknown ("+first+")")
            break;
    }
    return res
}

function blobUtils(m) {
    var bopt = document.createElement("div")
    bopt.classList.add("github_blob_option")
    var det = document.createElement("details")
    var ul = document.createElement("ul")
    Array.from([
        {
            ct: "Switch background color",
            sep:false, 
            ev:(EventHandler)=>{
                Array.from(document.getElementsByClassName("github_blob")).forEach(gblob=>{
                    switch (gblob.style.backgroundColor) {
                        case "#0d1117":
                        case "rgb(13, 17, 23)":
                        case "var(--color-canvas-default)":
                            gblob.style.backgroundColor="#f2eee8"//rgb(242, 238, 232)
                            break;
                        default:
                            gblob.style.backgroundColor="#0d1117"//rgb(13, 17, 23)
                            break;
                    } 
                })
            }
        },{
            ct: "View raw",
            sep:false, 
            ev:(EventHandler)=>{}
        },{
            ct: "Allow selection",
            sep:false, 
            ev:(EventHandler)=>{
                var x = document.getElementsByClassName("page")[0]
                var att = "canselect"
                if (x.classList.contains(att)) x.classList.remove(att)
                else x.classList.add(att)
            }
        },{
            ct: "Copy raw contents", 
            sep:false,
            ev:(EventHandler)=>{}
        },{
            ct: "View blame",
            sep:false,
            ev:(EventHandler)=>{}
        },{
            ct: "",
            sep:true,
            ev:(EventHandler)=>{}
        },{
            ct: "Edit file",
            sep:false,
            ev:(EventHandler)=>{}
        },{
            ct: "Open in github.dev",
            sep:false,
            ev:(EventHandler)=>{}
        },
    ]).forEach(x=>{
        var l = document.createElement("li")
        l.innerHTML=x.ct
        if (x.sep) {
            l.classList.add("github_utils_hseparator")
        }
        l.addEventListener("click",x.ev)
        ul.appendChild(l)
    })
    var sum = document.createElement("summary")
    var svg = document.createElementNS("http://www.w3.org/2000/svg","svg")
    var path = document.createElementNS("http://www.w3.org/2000/svg","path")
    svg.setAttribute("viewBox","0 0 16 16")
    svg.setAttribute("height","16")
    svg.setAttribute("width","16")
    path.setAttribute("d","M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z")
    
    svg.appendChild(path)
    sum.appendChild(svg)
    det.appendChild(sum)
    det.appendChild(ul)
    bopt.appendChild(det)
    return bopt
}

function createDetailsBlob(m) {
    var divdet = document.createElement("div")
    divdet.classList.add("github_blob_det")
    var s = document.createElement("span")
    var lt = ()=>{if (m.l==1) {return "line"} else return "lines"}
    s.innerHTML=m.lines+" "+lt()+'<span class="github_utils_vseparator"></span>'+parseSize(m.item.size)
    divdet.appendChild(s)
    divdet.appendChild(blobUtils(m))
    return divdet
}