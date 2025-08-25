import { ListItem } from "../ListItem/ListItem";
import styles from "./List.module.css";

export const List = ({ itemList, isLoading, error }) => {
  // On ne gère plus la logique de fetching ici.
  // Ce composant est "dumb" et ne fait qu'afficher ce qu'il reçoit en props.

  if (isLoading) {
    return (
      <div>
        <div className="spinner-border m-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!itemList || itemList.length === 0) {
    return <p>Aucun match trouvé.</p>;
  }

  const matchListDisplay = itemList.map((match, index) => (
    <ListItem key={index} match={match} />
  ));

  return (
    <div className="box">
      <ul className={`${styles.container} row`}>{matchListDisplay}</ul>
    </div>
  );
};
