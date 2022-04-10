import { Component } from 'react';

export class Card extends Component {
    constructor(props){
        super(props)
        this.props = props;
    }

    render(){
        return(
            <>
                <div className="grid grid-cols-8">
                    <div className={
                        `
                               ${this.props.isDarkMode ? 'bg-zinc-800' : ''}
                               ${true ? 'min-h-fit col-start-2 col-span-6 pt-5': ''}
                            `
                    }>
                        <div>
                            <h1> Franco Canevali </h1>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}
