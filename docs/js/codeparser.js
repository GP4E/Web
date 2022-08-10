var json = {
    language: {
        js: {
            cff7b72: /(((async )?function)|(if)|(else)|(var)|(=(>)?)|(return)|(break)|(await)|(new)|(\+)|(\/)|(\*)|(\-))/g,
            cd2a8ff: /([A-z]*)(?=\()/g,
            cffa657: /\(\s*([^".)]+?)\s*\)/g,
            c79c0ff: /[\(\)\[\]\{\}\"\']/g,
            ca5d6ff: /("|')[^\n]*("|')/g,
            c79c0ff: /[0-9]*/g
        },
        gitignore: {
            c79c0ff: /[\(\)\[\]\{\}\"\']/g
        }
    }
}

function parse(string, lang) {
    var html = string+"";
    var lj = json.language[lang]
    if (lj!=null&&lj!=undefined) {
        var cls = Object.keys(lj)
        cls.forEach((c)=>{
            var regex = new RegExp(lj[c])
            html = html.replace(regex,'&span#'+c.slice(1)+'";$&&end;')
        })
        console.log(html)
        //html.match()
        return html
    } else return string
}