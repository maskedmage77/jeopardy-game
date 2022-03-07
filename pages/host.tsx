import type { NextPage } from 'next';
import styles from '../styles/Display.module.css';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState } from 'react';
import getCategories from '../apiCalls/getCategories';
import getClues from '../apiCalls/getClues';
import io from 'Socket.IO-client';
import ClueArray from '../types/ClueArray';
import CategoryComponent from '../components/Host/CategoryComponent';
import Game from '../types/Game';
import Category from '../types/Category';
import CardComponent from '../components/Host/CardComponent';

let socket: any;

const Host: NextPage = () => {

  const multiplier = 2;
  const [shownQuestion, setShownQuestion] = useState('');
  const [game, setGame] = useState<Game>();
   
  // NETWORK GAME CODE ----------------------------------------------------------------------------------- //

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    requestGame();

    socket.on('connect', () => {
      console.log('connected');
    })

    socket.on('update_game', (data: Game) => {
      console.log(data);
      setGame(data);
    })
  }

  useEffect(() => {
    socketInitializer();
  }, []);

  // GAME ACTIONS ----------------------------------------------------------------------------------------- / 

  const requestGame = () => {
    socket.emit('request_game');
  }

  const clueSelected = (clue: any) => {
    socket.emit('clue-selected', clue)
  }
  // GAME LOGIC ------------------------------------------------------------------------------------------ //

  const Card = ({answer, question, price}: {answer: string, question: string, price: number}) => {
    return (
      <div className={styles.card} onClick={() => {
        clueSelected({answer, question, price});
        setShownQuestion(question);
      }}>
        ${ (price + 1) * 100 * multiplier  }
      </div>
    );
  }
  
  const handleCardPress = (answer: string, question: string, price: number) => {
    clueSelected({answer, question, price});
    setShownQuestion(question);
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.grid}>
        <div className={styles.board}>

          { game?.round_1.board.categories.map((category) => {
            return ( <>
              <CategoryComponent category={category.title} />
              { category.clues.map((clue, index) => {
                let price = (index + 1) * 200;
                return (
                  index <= 4 ? <CardComponent answer={clue.answer} question={clue.question} price={price} onPress={() => {handleCardPress(clue.answer, clue.question, price)}} /> : null  
                );
              }) }
            </> );
          }) }



        </div>
      </div>
    </div>
  )
}

export default Host;