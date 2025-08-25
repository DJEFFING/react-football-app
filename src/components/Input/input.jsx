import { useState } from "react";
import styles from "./Input.module.css";

export const Input = ({ SearchItemByName }) => {
  const [searchQuery, SetSearchQuery] = useState("");

  const handleInputChange = (e) => {
    SetSearchQuery(e.target.value);
    SearchItemByName(searchQuery);
    console.log(searchQuery);
  };

  const handleSeachItem = (e)=>{
    e.preventDefault();
    // if(searchQuery.trim()){
      SearchItemByName(searchQuery);
      SetSearchQuery("");
    // }
    
  };

  return (
    <div className={`box ${styles.element}`}>
      <h2 className={styles.title}> Recherchez queleque chose ici </h2>
      <form className={styles.container} onSubmit={handleSeachItem}>
        <input type="text" className={styles.input} placeholder="Recherche" onChange={handleInputChange} />
        <button type="submit" className="button-primary">
          Recherche
        </button>
      </form>
    </div>
  );
};
