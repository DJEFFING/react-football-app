import { useEffect, useState } from "react";
import { ListItem } from "../ListItem/ListItem";
import styles from "./List.module.css";

export const List = ({getMatchList}) =>{
    const [matchList, setMatchList]=useState([]);

    useEffect( ()=>{
        const fetchMatchList = async () =>{
            try {
                const result = await getMatchList(); // Attendre que la fonction retourne "result"
                setMatchList(result.response); // Stocker "result" dans l'état local
                // console.log("La liste de tous les matchs : ", result);
            } catch (err) {
                console.error("Une erreur s'est produite lors de la récupération des matchs :", err.message);
            }
        };
        
        fetchMatchList();

    },[getMatchList])

    const matchListDisplay = matchList.map((match) => (
        <ListItem match={match} />
    ));




    if(matchList && matchList.length>0){
        return (
            <div className="box">
                {matchList && matchList.length>0 && (
                <ul className={`${ styles.container } row`}> {matchListDisplay} </ul>
                )}
            </div>  
        );
    }
}