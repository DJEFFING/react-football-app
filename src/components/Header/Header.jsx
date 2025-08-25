import React from "react";
import styles from './Header.module.css'
// import reactLocgo from "../../assets/react.svg";
import flaskScoreLogo from "../../assets/logo-faskScrore2.png";

export const Header = () =>{
    return(
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <img src={flaskScoreLogo} alt="logo" width={70} height={60}/>
                <div>
                    <h1>FlashScore +</h1>
                    <div className="color-gray">
                        <code>Revivez chaque but, chaque action, instantanément</code>
                    </div>
                </div>
            </div>
            <div className="color-primary">
                v.1.0
            </div>

        </div>
    );
}