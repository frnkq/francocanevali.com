import {Component} from 'react';
import {Card} from './components/card';
import {Footer} from './components/footer';
import {Header} from './components/header'

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
                    ${this.state.isDarkMode ? 'rotate-180' : 'rotate-0'}
                    ${true ? 'p-3 text-5xl' : ''}
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
                    ${this.state.isDarkMode ? ' bg-black' : 'bg-white'}
                    ${this.state.isDarkMode ? ' text-green-500' : ' text-dark'}
                    ${true ? 'w-full h-full flex flex-col content-between justify-between' : ''}
                    `
                }>
                    <header className="">
                        <div className="static">
                            <div className="absolute top-0 right-0">
                                <DarkModeToggle />
                            </div>
                        </div>
                        <Header showNav={true} />
                    </header>
                    <hr />
                    <main className="mb-auto">
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

