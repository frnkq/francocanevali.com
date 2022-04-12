import {Component} from 'react';
import {Card} from './card';
import {Footer} from './footer';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.changeDarkMode = this.changeDarkMode.bind(this);
        this.state = {isDarkMode: false};
    }

    changeDarkMode() {
        this.setState({isDarkMode: !this.state.isDarkMode})
    }

    DarkModeToggle() {
        return (
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
                    ${this.state.isDarkMode ? ' bg-black' : ''}
                    ${this.state.isDarkMode ? ' text-green-500' : ' text-dark'}
                    ${true ? 'w-full h-screen flex flex-col justify-between' : ''}
                    `
                }>
                    <header className="h-10">
                        <div className="static">
                            <div className="absolute top-0 right-0">
                                <DarkModeToggle />
                            </div>
                        </div>
                    </header>
                    <main className="h-10 mb-auto">
                        <Card isDarkMode={this.state.isDarkMode} />
                    </main>
                    <footer className="text-center">
                        <Footer />
                    </footer>
                </div>
            </>
        )
    }
}

