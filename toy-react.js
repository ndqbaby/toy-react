
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value){
        this.root.setAttribute(name, value);
    }
    appendChild(component){
        this.root.appendChild(component.root);
    }
}

class TextWrapper{
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null); //创造一个绝对空对象
        this.children = [];
        this._root = null; //元素节点
    }
    setAttribute(name, value){
        this.props[name] = value;
    }
    appendChild(component){
        this.children.push(component);
    }
    get root(){
        if(!this._root){
            this._root = this.render().root; //得到render后的root
        }
        return this._root;
    }

}
export function createElement(type, attributes, ...children) {
    let e;
    if (typeof type === "string") {
        e = ElementWrapper(type);
    } else {
        e = new type;
    }

    if (attributes) {
        for (let p in attributes) {
            e.setAttribute(p, attributes[p]);
        }
    }
    for (let child of children) {
        if (typeof child === 'string') {
            child = TextWrapper(child);
        }
        e.appendChild(child);
    }
    return e;
}

export function render(component, parentElement) {
    parentElement.append(component.root);
}