import React from 'react';
import "./headerCommon.css";

export default function Header({titleText,redirectText}){
    let titleArray = titleText;
    let titleRedirect = redirectText;
    return (<header className='header'>
        <ul className='header__title'>
            {titleArray.map((title,index) => {return <li key={index.toString()} className="header__title__element">{title}</li>})}
            <div className='header__title__redirectpages'>
                {titleRedirect.map((redirect,index) => {return <li key={index.toString()} className="header__title__redirectpages__element" onClick={redirect.function}>{redirect.text}</li>})}
            </div>
        </ul>
    </header>)
}