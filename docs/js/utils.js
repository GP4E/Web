function query() {
    var result = {};
    if (location.search.length>0) {
        var pairs = location.search.slice(1).split('&');
        pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
    }
    return result
}
function nou(p) {
    return (p==null||p==undefined)
}

function parseSize(s) {
    // Byte to bo
    var arr = ["B","KB","MB","GB","TB"]
    var nc = Math.floor(Math.log10(s))+1
    var ind = Math.min(Math.abs(Math.ceil(nc/3)-1),arr.length-1)
    var b = Number.parseInt(s)/Math.pow(10,ind*3)
    return b.toFixed(Math.abs(Math.sign(ind)))+" "+arr[ind]
}