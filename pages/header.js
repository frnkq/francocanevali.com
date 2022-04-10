import { Component } from 'react'

export class Header extends Component {
    menuItems = [
        {
            "name": "Home",
            "link": "/",
        },
        {
            "name": "Blog",
            "link": "/blog",
        },
        {
            "name": "Github",
            "link": "https://github.com/frnkq/",
            "newTab": true
        },
        {
            "name": "LinkedIn",
            "link": "https://github.com/frnkq/",
            "newTab": true
        },
    ];

    constructor(props){
        super(props);
    }

    Menu(){
        const menu = this.menuItems.map((item)=>{
            return (
                <>
                    <a href={item.link} target={ item.newTab? '_blank' : ''} key={item.name}>
                        <span className="px-3 py-2 bg-stone-500">{item.name}</span>
                    </a>
                </>
            )
        })

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

    render(){
        const Menu = this.Menu.bind(this);
        return (
            <>
                <div className={
                    `
                    ${this.props.isDarkMode ? ' bg-blue-800' : ' bg-red-900'}
                    ${this.props.isDarkMode ? ' text-white' : ' text-dark'}
                    ${true ? 'w-full bg-stone-300 p-3' : ''}
                    `
                }>
                    <Menu />
                </div>
            </>
        )
    }
}
