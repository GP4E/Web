var json = {
    language: {
        js: {
            cff7b72: /(((async )?function)|(if)|(else)|(var)|(=(>)?)|(return)|(break)|(await)|(new)|(\+)|(\/)|(\*)|(\-))/g,
            cd2a8ff: /([A-z]*)(?=\()/,
            cffa657: /\(\s*([^".)]+?)\s*\)/,
            c79c0ff: /[\(\)\[\]\{\}\"\']/,
        }
    }
}

function parse(string, lang) {
    var html = string+"";
    var lj = json.language[lang]
    if (!lj) {
        var cls = Object.keys(lj)
        cls.forEach((c)=>{
            var regex = new RegExp(lj[c])
            html.replace(regex,'<span style="color: #'+c.slice(1)+'">$&</span>')
        })
        return html
    } else return string
}
