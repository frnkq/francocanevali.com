import { Component } from 'react';

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    getMenu() {
        const menuItems = [
            {
                "name": "Home",
                "link": "/",
            },
            {
                "name": "Blog",
                "link": "/blog",
            },
            { "name": "Github",
                "link": "https://github.com/frnkq/",
                "newTab": true
            },
            {
                "name": "LinkedIn",
                "link": "https://github.com/frnkq/",
                "newTab": true
            }
        ];
        const menu = menuItems.map((item)=>{
            return (
                <>
                    <a href={item.link} target={ item.newTab? '_blank' : ''} key={item.name}>
                        <span className={
                        `
                          ${this.props.isDarkMode ? ' bg-stone-400' : ' bg-stone-100'}
                          ${this.props.isDarkMode ? ' text-white' : ' text-dark'}
                          ${true ? 'px-3 py-2' : ''}
                         `
                    }>{item.name}</span>
                    </a>
                </>
            )
        })

        return menu;
    }

    render(){
        const menu = this.getMenu();
        return (
            <>
                <div className="">
                    <span className="flex justify-around">
            {menu}
        </span>
    </div>
</>
        );
    }
}
