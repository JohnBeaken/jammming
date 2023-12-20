import React from 'react';
import styles from './login.module.css';

function Login(props) {
    return (
        <div className={styles.wrapper}>
            <h2>Welcome</h2>
            <button
                onClick={props.login}
            >Log In to Spotify</button>
        </div>
    );
}

export default Login;