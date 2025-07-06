import styles from "./ListItem.module.css";
// import { Match } from "../../types/match.tsx";
import React from "react";

export const ListItem = ({ match }) => {
  // On déstructure l'objet 'match' pour accéder à ses propriétés
  const {
    title,
    competition,
    matchviewUrl,
    competitionUrl,
    thumbnail,
    date,
    videos,
  } = match;

  // Formater la date pour une meileur lisibilter
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li className={styles.container}>
      <img src={thumbnail} alt={title} className={styles.thumbnail} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.competition}>{competition}</p>
        <p className={styles.date}>{formattedDate}</p>
        <div className={styles.links}>
          <a href={matchviewUrl} target="_blank" rel="noopener noreferrer">
            Voir le match
          </a>
          <a href={competitionUrl} target="_blank" rel="noopener noreferrer">
            Voir la compétition
          </a>
        </div>
        {/* Afficher les vidéos. On vérifie si 'videos' existe et contient des éléments. */}
        {videos && videos.length > 0 && (
          // ATTENTION : dangerouslySetInnerHTML est à utiliser avec prudence !
          // Il insère du HTML brut. Assurez-vous que la source est fiable pour éviter les failles de sécurité (XSS).
          <div
            className={styles.videoEmbed}
            dangerouslySetInnerHTML={{ __html: videos[0].embed }}
          />
        )}
      </div>
    </li>
  );
};
