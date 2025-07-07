import { Link } from "react-router-dom";
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
    <li className={`card col-lg-3 col-xl-3`} style={{ width: "24rem" }}>
      <img src={thumbnail} className="card-img-top" alt="image.jpeg" />
      <div className="card-body">
        <h5 className="card-title text-white">{title}</h5>
        <p className="card-text text-white">{competition}</p>
        <span className="text-white">{formattedDate}</span>
        <br />
        <Link to={`/match/${videos[0].id}`} href={matchviewUrl} className="btn btn-primary">
          voir +
        </Link>
      </div>
    </li>
    // </li>
  );
};
