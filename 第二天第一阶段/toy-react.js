const RENDER_TO_DOM = Symbol('render to dom');

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        //\s\S表示所有的字符
        if (name.match(/^on([\s\S]+)$/)) {
            //保证事件小写开头
            this.root.addEventListener(RegExp.$1.replace(/^[/s/S]/, c => c.toLowerCase()), value);
        } else {
            this.root.setAttribute(name, value);
        }
    }

    appendChild(component) {
        let range = document.createRange();
        range.setStart(this.root, this.root.childNodes.length);
        range.setEnd(this.root, this.root.childNodes.length);
        range.deleteContents();  //删除所有parentElement所有的内容
        component[RENDER_TO_DOM](range) //将component插入到range的最开始
    }

    [RENDER_TO_DOM](range) { //课程第二天添加
        range.deleteContents(); //清空内容
        range.insertNode(this.root); //把内容加入到this.root
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

    [RENDER_TO_DOM](range) { //课程第二天添加
        range.deleteContents();
        range.insertNode(this.root); //在范围range的开头插入一个节点。
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null); //创造一个绝对空对象
        this.children = [];
        this._root = null; //元素节点
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(component) {
        this.children.push(component);
    }

    [RENDER_TO_DOM](range) {
        this._range = range; //将range存在_range
        this.render()[RENDER_TO_DOM](range);
    }

    rerender() {
        this._range.deleteContents();
        this[RENDER_TO_DOM](this._range);
    }

    setState(newState) {
        //因为typeof null为object 所以要加this.state === null
        if (this.state === null || typeof this.state !== 'object') {
            this.state = newState;
            this.rerender();
            return;
        }
        const merge = function(oldState, newState) {
            for (let p in newState) {
                if (oldState[p] === null || typeof oldState[p] !== 'object') {
                    oldState[p] = newState[p];
                } else {
                    merge(oldState[p], newState[p]);
                }
            }
        };
        if (this.state) {
            merge(this.state, newState);
            this.rerender();
        }
    }

    // get root(){
    //     if(!this._root){
    //         this._root = this.render().root; //得到render后的root
    //     }
    //     return this._root;
    // }

}

export function createElement(type, attributes, ...children) {
    let e;
    if (typeof type === "string") {
        e = new ElementWrapper(type);
    } else {
        e = new type;
    }

    if (attributes) {
        for (let p in attributes) {
            e.setAttribute(p, attributes[p]);
        }
    }
    const insertChildren = function (children) {
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }
            if (typeof child === 'object' && child instanceof Array) {
                insertChildren(child);
            } else {
                e.appendChild(child);
            }
        }
    };
    insertChildren(children);
    return e;
}

export function render(component, parentElement) {
    let range = document.createRange();
    range.setStart(parentElement, 0);
    range.setEnd(parentElement, parentElement.childNodes.length);
    range.deleteContents();  //删除所有parentElement所有的内容
    component[RENDER_TO_DOM](range); //重新渲染
}