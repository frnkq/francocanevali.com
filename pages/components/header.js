import { Component } from 'react'
import { Menu } from './menu';

export class Header extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        return (
            <>
                <div className={
                    `
                    ${this.props.isDarkMode ? ' bg-zinc-800' : ''}
                    ${this.props.isDarkMode ? ' text-white' : ' text-dark'}
                    ${true ? 'w-full p-3' : ''}
                    `
                }>
                    <Menu isDarkMode = { this.props.isDarkMode }/>
                </div>
            </>
        )
    }
}
