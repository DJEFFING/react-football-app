import React from "react";
import styles from './Header.module.css'
import reactLocgo from "../../assets/react.svg";

export const Header = () =>{
    return(
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <img src={reactLocgo} alt="logo" width={50} height={50}/>
                <div>
                    <h1>Devoir de react TP1</h1>
                    <div className="color-gray">
                        <code>Je ne connais pas encore le titre de mon projet</code>
                    </div>
                </div>
            </div>
            <div className="color-primary">
                v.1.0
            </div>

        </div>
    );
}