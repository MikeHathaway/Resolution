import React from 'react';
// import style from './index.css'

type HeaderProps = {
    mycurrency: {
        token: Number
    }
}

export default function Header (props: HeaderProps) {
    return (
        <header>
            {/* <img src={logo} className={style.AppLogo} alt="logo" /> */}
            <p>
                Your balance: {props.mycurrency.token}
            </p>
        </header>
    )
}