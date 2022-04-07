import { Component, useState } from 'react';
import { Card } from './card';
import { Header } from './header';

let isDarkMode = false;

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.changeDarkMode = this.changeDarkMode.bind(this);
        this.state = { isDarkMode: false };
    }

    changeDarkMode(){
        this.setState({isDarkMode: !this.state.isDarkMode})
    }
    
    render() {
        const { isDarkMode } = this.state.isDarkMode;
        return (
            <>
                <div className={
                    `
                    ${this.state.isDarkMode ? ' bg-zinc-800' : ' bg-zinc-300'}
                    ${this.state.isDarkMode ? ' text-white' : ' text-dark'}
                    ${true ? 'w-full h-screen' : ''}
                    `
                }>
                    <Header />
                    <Card />
                    <button onClick={this.changeDarkMode}>☀️A/🌕</button>
                    <div className="mx-auto">
                        <p>Franco</p>
                    </div>
                </div>
            </>
        )
    }
}

