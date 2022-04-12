import {Component} from 'react';
import {menuItems} from './menu'
import Image from 'next/image'
import me from '../../public/assets/me.jpg'

export class Card extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.career = 'Software Developer +9yrs'
    }

    getContacts() {
        return (<>
            {menuItems.map((contact, index) => {
                return (
                    <a href={contact.link}
                        target={contact.newTab ? '_blank' : ''}
                        key={'link_' + contact.name}>
                        <span
                            key={'span_' + contact.name}
                            className="pr-3 underline">
                            {contact.name == 'Home' ? '' : contact.name}
                        </span>
                    </a>
                )
            })}
        </>)
    }

    getSkills() {
        const skills = [
            {
                text: "Full stack development",
            },
            {
                text: "REST API development and integration",
            },
            {
                text: "Common libraries and frameworks",
                subText: "Angular, Laravel, NodeJs, Express, .Net, React, Vue, Spring"
            },
            {
                text: "Server configuration and maintenance",
                subText: "Linux and Windows Server, Scripting, cronjobs, CLI"
            },
            {
                text: "SAAS & PAAS",
                subText: "Amazon Web Services, Google Cloud"
            },
            {
                text: "Content Management Systems",
                subText: "E-Commerce engines, Wordpress and Wordpress-like systems"
            },
        ];

        return (
            <ul>
                {skills.map((skill, index) => {
                    return (<li key={'skill_' + index} className="mb-1.5">
                        <span key={'skillspan_' + index} className="font-bold"> &gt; {skill.text}</span>
                        {skill.subText ? ' (' + skill.subText + ')' : ''}
                    </li>)
                })}
            </ul>
        )
    }

    render() {
        const skills = this.getSkills();
        const contacts = this.getContacts();
        return (
            <>
                <div className="p-2 p-4 grid sm:grid-cols-1 md:grid-cols-7">
                    <div className="p-2 sm:col-span-7 md:col-span-5 md:col-start-2">
                        <h1 className="mb-2 text-3xl"> Franco Canevali </h1>
                        <div className="grid sm:grid-cols-1 md:grid-cols-6">
                            <div className="w-full h-full md:col-span-3">
                                <Image src={me} />
                            </div>
                            <p className="md:col-span-3 md:ml-10">
                                <h1 className="mb-1 text-2xl underline">Skills</h1>
                                {skills}
                                <hr className="my-3" />
                                {contacts}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
