function getMenu()  {
    var menuJSON = [
        {name: "Home", href: "./home.html"},
        {name: "Game", Sub: ["General","Graphic","Story","Script"], href: "./Game.html"},
        {name: "Login", id: "lg", href: "./Login.html"}
    ] 
    var t = "a"
    var res = "<ul>"
    menuJSON.forEach(mi => {
        res+="<li"
        if (
            mi.id != undefined &&
            mi.id != null &&
            mi.id.length > 0
        ) {
            res+=" id=\""+mi.id+"\""
        }
        res+="><"+t
        if (
            mi.href != undefined &&
            mi.href != null &&
            mi.href.length > 0
        ) {
            res+=" href=\""+mi.href.toLowerCase()+"\""
        }
        res+=">"+mi.name+"</"+t+">"
        if (
            mi.Sub != undefined &&
            mi.Sub != null &&
            mi.Sub.length > 0
        ) {
            res += "<ul>"
            mi.Sub.forEach(mis=>{
                res+="<li><"+t
                if (
                    mi.href != undefined &&
                    mi.href != null &&
                    mi.href.length > 0
                ) {
                    
                    var ar = mi.href.split(".")
                    var l = ar.pop();
                    ar.push("_"+mis)
                    ar.push("."+l)
                    var hr = "."+ar.join("")
                    res+=" href=\""+hr.toLowerCase()+"\""
                }
                res+=">"+mis+"</"+t+"></li>"
            })
            res += "</ul>"
        }
        res+="</li>"
    })
    res+="</ul>"
    
    return res
}