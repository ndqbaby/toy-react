
/*
let a = <div id='a' class='c'>
        <a/>
    <div/>
    </div>;
会翻译成
var a = React.createElement("div", {
    id: "a",
    "class": "c"
}, createElement("a", null), createElement("div", null));

如果webpack.config.js中babel中的babel-loader的插件'@babel/plugin-transform-react-jsx'配置了pragma: 'createElement' 会变成
var a = createElement("div", {
    id: "a",
    "class": "c"
}, createElement("a", null), createElement("div", null));
 */

/*
function createElement(tagName, attributes, ...children){
    let e = document.createElement(tagName);
    if(attributes){
        for( let p in attributes){
            e.setAttribute(p, attributes[p]);
        }
    }
    for(let child of children){
        if(typeof child === 'string'){
            child = document.createTextNode(child);
        }
        e.appendChild(child);
    }
    return e;
}

document.body.appendChild(createElement("div", {
    id:'a',
    class:'c'
}, createElement("div", null, 'abc'), createElement('div', null), createElement('div', null)));

*/