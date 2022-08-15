var json = {
    language: {
        js: {
            cff7b72: /(((async )?function)|(if)|(else)|(var)|(=(>)?)|(return)|(break)|(await)|(new)|(\+)|(\/)|(\*)|(\-))/g,
            cd2a8ff: /([A-z]*)(?=\()/g,
            cffa657: /\(\s*([^".)]+?)\s*\)/g,
            c79c0ff: /[\(\)\[\]\{\}\"\']/g,
            ca5d6ff: /("|')[^\n]*("|')/g,
            //a79c0ff: /[0-9]*/g
        },
        gitignore: {
            c79c0ff: /[\(\)\[\]\{\}\"\']/g
        }
    }
}

function parse(string, lang) {
    var html = string+"";
    var lj = json.language[lang]
    try {
        var cls = Object.keys(lj)
        cls.forEach((c)=>{
            var regex = new RegExp(lj[c])
            html = html.replace(regex,'&span#'+c.slice(1)+';$&&end;')
        })
        html = html.replace(new RegExp(/&span#[A-Fa-f0-9]*;/g), function (match) {
          return "<span style='color: "+match.slice(5,match.length-1)+"'>"
        })
        html = html.replace(new RegExp(/&end;/g),"</span>")
        
        //html.match()
        return html
    } catch {
        return string
    }
}