const menuItems = [
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


export function Menu(){
    const menu = menuItems.map((item)=>{
        return (
            <>
            <a href={item.link} target={ item.newTab? '_blank' : ''} key={item.name}>
                <span className="px-3 py-2 bg-stone-500">{item.name}</span>
            </a>
            </>
        )
    });

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

export function Header() {
    return (
        <>
            <div className="\
                w-full bg-stone-300 \
                p-3
            ">
            <Menu />
            </div>
        </>
    )
}
