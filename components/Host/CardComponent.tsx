import Clue from "../../types/Clue";
import styles from './Card.module.css';

interface Props {
  answer: string; 
  question: string;
  price: number;
  onPress: Function;
}

export default function CardComponent ({answer, question, price, onPress}: Props) {
  return (
    <div className={styles.card} onClick={() => {
      onPress()
    }}>
      ${ price }
    </div>
  );
}