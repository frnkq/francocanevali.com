import {Component} from 'react';

export const menuItems = [
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
    }
];
export class Menu extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    getMenu() {
        const menu = menuItems.map((item) => {
            return (
                <>
                    <a href={item.link} target={item.newTab ? '_blank' : ''} key={'link_' + item.name}>
                        <span className={
                            `
                          ${this.props.isDarkMode ? ' bg-stone-400' : ' bg-stone-100'}
                          ${this.props.isDarkMode ? ' text-white' : ' text-dark'}
                          ${true ? 'px-3 py-2' : ''}
                         `
                        } key={'span_' + item.name}>{item.name}</span>
                    </a>
                </>
            )
        })

        return menu;
    }

    render() {
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
