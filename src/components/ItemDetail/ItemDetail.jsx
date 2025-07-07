import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ItemDetail = ({ getMatchList }) => {
  const { id } = useParams(); // Récupère l'ID du match depuis l'URL
  const [error, setError] = useState(null);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true); // Ajoutez un état de chargement
  const navigate = useNavigate(); // Hook pour la navigation programmatique

  useEffect(() => {
    const getMatchById = async () => {
      try {
        setLoading(true); // Démarre le chargement
        const result = await getMatchList();
        if (result) {
          const allMatches = result.response || result; // Ajustez ici selon votre API
          const foundMatch = allMatches.find((m) => m.videos[0].id === id);
          setMatch(foundMatch);
          console.log("le match qui a été trouver : ", foundMatch);
        } else {
          setError("Match non trouvé");
        }
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des détails du match :",
          err
        );
        setError("Erreur lors du chargement des détails du match.");
    } finally {
        setLoading(false); // Le chargement est terminé, qu'il y ait eu succès ou erreur
    }
    };

    getMatchById();
  }, [getMatchList, id]);

// --- RENDU CONDITIONNEL : C'EST LA CLÉ POUR ÉVITER L'ERREUR ---

  // 1. Afficher un état de chargement
  if (loading) {
    return (
      <div className="match-detail-container">
        <p className="text-white">Chargement des détails du match...</p>
      </div>
    );
  }

  // 2. Afficher un état d'erreur
  if (error) {
    return (
      <div className="match-detail-container">
        <p className="text-danger">Erreur : {error}</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
          &larr; Retour
        </button>
      </div>
    );
  }

  // 3. Si le match n'est pas trouvé après le chargement et sans erreur spécifique
  if (!match) {
    return (
      <div className="match-detail-container">
        <p className="text-white">Aucun match trouvé pour l'ID : {id}</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
          &larr; Retour
        </button>
      </div>
    );
  }

  // Si le code arrive jusqu'ici, cela signifie que 'match' EST DÉFINI et contient des données.
  // Vous pouvez maintenant accéder à ses propriétés en toute sécurité.
  const formattedDate = new Date(match.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="match-detail-container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">
        &larr; Retour à la liste
      </button>

      <h1 className="text-white">{match.title}</h1>
      <p className="text-white"><strong>Compétition :</strong> {match.competition}</p>
      <p className="text-white"><strong>Date :</strong> {formattedDate}</p>

      {/* Affichez la vidéo et autres détails ici */}
      {match.videos && match.videos.length > 0 && (
        <div className="video-player-wrapper">
          <div dangerouslySetInnerHTML={{ __html: match.videos[0].embed }} />
          <p className="text-white mt-2">*{match.videos[0].title}</p>
        </div>
      )}

      {/* Liens supplémentaires et boutons */}
      <div className="d-flex gap-3 mt-4">
        {match.matchviewUrl && (
          <a href={match.matchviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-info">
            Voir le match sur Scorebat
          </a>
        )}

        {match.competitionUrl && (
          <a href={match.competitionUrl} target="_blank" rel="noopener noreferrer" className="btn btn-info">
            Détails de la compétition
          </a>
        )}
      </div>
      
      <div className="d-flex gap-3 mt-4">
        <button className="btn btn-success" onClick={() => alert("Ajouter aux favoris !")}>
          Ajouter aux favoris
        </button>

        <button className="btn btn-warning" onClick={() => alert("Partager !")}>
          Partager
        </button>
      </div>
    </div>
  );
};