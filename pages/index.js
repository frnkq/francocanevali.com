import { Component } from 'react';
import { Card } from './card';
import { Header } from './header';

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.changeDarkMode = this.changeDarkMode.bind(this);
        this.state = { isDarkMode: false };
    }

    changeDarkMode(){
        this.setState({isDarkMode: !this.state.isDarkMode})
    }

    DarkModeToggle(){
        return(
            <button onClick={this.changeDarkMode} className={
                `
                    ${this.state.isDarkMode ? 'bg-black' : 'bg-white'}  
                    ${true ? 'p-3' : ''}
                `
            }> 🌗 </button>
        );
    }
    
    render() {
        const DarkModeToggle = this.DarkModeToggle.bind(this);
        return (
            <>
                <div id="container" className={
                    `
                    ${this.state.isDarkMode ? ' bg-zinc-700' : ''}
                    ${this.state.isDarkMode ? ' text-white' : ' text-dark'}
                    ${true ? 'w-full h-screen' : ''}
                    `
                }>
                    <div className="static">
                        <div className="absolute top-0 right-0">
                         <DarkModeToggle/>
                        </div>
                    </div>
                    <Header isDarkMode = {this.state.isDarkMode} />
                    <Card isDarkMode = {this.state.isDarkMode} />
                </div>
            </>
        )
    }
}

