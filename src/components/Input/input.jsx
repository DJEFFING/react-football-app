import { useEffect, useState } from 'react';
import styles from './Input.module.css'

export const Input = ({searchQuery}) =>{
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://example.com/api/search?query=${searchQuery}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

    return(
        <div className={`box ${styles.element}`}>
            <h2 className={styles.title}> Recherchez queleque chose ici </h2>
            <form className={styles.container} action="">
                <input type="text" className={styles.input} placeholder='Recherche' />
                <button type='submit' className='button-primary'>Recherche</button>
            </form>
        </div>
    );
}

