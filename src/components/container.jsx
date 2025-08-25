import { Header } from "./Header/Header";
import { token } from "../environements/environement";
import { Input } from "./Input/input";
import { List } from "./List/List";
import { useState, useEffect } from "react";

export const Container = () => {
  const [originalItemList, SetOriginalItemList] = useState([]); // La liste Original
  const [itemList, SetItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Ajout d'un état pour le chargement
  const [error, setError] = useState(null); // Ajout d'un état pour les erreurs

  // Fonction de récupération des données à l'initialisation du composant.
  // On ne fait cette requête qu'une seule fois.
  useEffect(() => {
    const getMatchList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.scorebat.com/video-api/v3/feed/?token=${token.VIDEO_API_ACCESS_TOKEN}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        SetItemList(result.response);
        SetOriginalItemList(result.response);
      } catch (err) {
        console.error("Une erreur s'est produite :", err.message);
        setError("Impossible de charger les données. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    };

    getMatchList();
  }, []); // Le tableau de dépendances vide [] garantit que cet effet ne se déclenche qu'une seule fois.

  // Fonction de recherche, elle ne modifie pas la liste d'origine,
  // elle renvoie simplement le résultat.
  const SearchItemByName = (name) => {
    setIsLoading(true); // Activation du chargement
    if (name.trim() === "") {
      // Si la recherche est vide, on retourne la liste complète.
      console.log("originalItemList : ",originalItemList);
      setIsLoading(false); //deactivation du chargement
      SetItemList(originalItemList);
      return;
    }

    const filteredList = originalItemList.filter((item) => {
      const itemTitle = item.title.toLowerCase();
      const searchTerm = name.toLowerCase();
      return itemTitle.includes(searchTerm);
    });
    setIsLoading(false);
    SetItemList(filteredList);
    // On n'a plus besoin d'un état "isSeach" si on gère la liste de cette manière.
  };

  return (
    <main>
      <Header />
      <Input SearchItemByName={SearchItemByName} />
      <List itemList={itemList} isLoading={isLoading} error={error} />
    </main>
  );
};