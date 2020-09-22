for (let i of [1, 2, 3]) {
    console.log(i);
}

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
