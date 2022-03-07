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
import Clue from '../types/Clue';
import CardComponent from '../components/Host/CardComponent';

let socket: any;

const Display: NextPage = () => {

  const multiplier = 2;
  const [showCard, setShowCard] = useState(false);
  const [shownQuestion, setShownQuestion] = useState('');
  const [shownAnswer, setShownAnswer] = useState('');
  const [categories, setCategories] = useState([]);
  
  const [category_1, setCategory_1] = useState<ClueArray>([]);
  const [category_0, setCategory_0] = useState<ClueArray>([]);
  const [category_2, setCategory_2] = useState<ClueArray>([]);
  const [category_3, setCategory_3] = useState<ClueArray>([]);
  const [category_4, setCategory_4] = useState<ClueArray>([]);
  const [category_5, setCategory_5] = useState<ClueArray>([]);
  const [game, setGame] = useState<Game>();

  // NETWORK GAME CODE ----------------------------------------------------------------------------------- //

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected');
    })
    
    socket.on('display_clue', (data: Clue) => {
      setShownQuestion(data.question)
      setShowCard(true);
    })
    
  }

  useEffect(() => {
    socketInitializer();
  }, []);

  // GAME ACTIONS ---------------------------------------------------------------------------------------- //

  const gameCreated = (data: Game) => {
    socket.emit('game_created', data);
  }

  const clueSelected = (clue: any) => {
    socket.emit('clue-selected', clue)
  }
  
  // CREATE BOARD ---------------------------------------------------------------------------------------- //

    useEffect(() => {
      let offset = Math.floor(Math.random() * 10000);
      getCategories(6, offset).then((call) => {
        setCategories(call.data);
        return call;
      }).then((call) => {
        call.data.forEach((category: any, index: any) => {
          getClues(category.id).then((data) => {
            switch (index) {
              case 0: setCategory_0(data.data); break;
              case 1: setCategory_1(data.data); break;
              case 2: setCategory_2(data.data); break;
              case 3: setCategory_3(data.data); break;
              case 4: setCategory_4(data.data); break;
              case 5: setCategory_5(data.data); break;
            }
          });
        });
      });
    }, []);

    useEffect(() => {
      if (category_0.length > 0 && category_1.length > 0 && category_2.length > 0 && category_3.length > 0 && category_4.length > 0 && category_5.length > 0) {
        let modified_categories = categories;
        modified_categories.forEach((category, index) => {
        });

        let new_game: Game = {
          round_1: {
            board: {
              categories: [
                { title: '', id: 0, clues: category_0 },
                { title: '', id: 0, clues: category_1 },
                { title: '', id: 0, clues: category_2 },
                { title: '', id: 0, clues: category_3 },
                { title: '', id: 0, clues: category_4 },
                {   title: '', id: 0, clues: category_5 }
              ]
            }
          },
          round_2: {
            board: {
              categories: [
                { title: '', id: 0, clues: category_0 },
                { title: '', id: 0, clues: category_1 },
                { title: '', id: 0, clues: category_2 },
                { title: '', id: 0, clues: category_3 },
                { title: '', id: 0, clues: category_4 },
                {   title: '', id: 0, clues: category_5 }
              ]
            }
          }
        }

        categories.forEach((category: Category, index) => {
          new_game.round_1.board.categories[index].title = category.title;
          new_game.round_1.board.categories[index].id = category.id;
        })

        setGame(new_game);
      }
    }, [category_0, category_1, category_2, category_3, category_4, category_5]);

    useEffect(() => {
      if (game !== undefined) {
        // console.log(game);
        gameCreated(game);
      }
      
    }, [game]);
   
  // GAME LOGIC ------------------------------------------------------------------------------------------ //

  const Card = ({answer, question, price}: {answer: string, question: string, price: number}) => {
    return (
      <div className={styles.card} onClick={() => {
        clueSelected({answer, question, price});
        setShowCard(!showCard); 
        setShownQuestion(question);
      }}>
        ${ (price + 1) * 100 * multiplier  }
      </div>
    );
  }
  
  return (
    <div className={styles.wrapper}>
     
     <CSSTransition
        in={showCard} 
        timeout={200} classNames="my-node"
        unmountOnExit >
        <div className={styles.answerCard} onClick={() => {setShowCard(!showCard)}}>
          <div className={styles.answerCardInner}>
            { shownQuestion.toLocaleUpperCase() }
          </div>
        </div>
      </CSSTransition>
      

      <div className={styles.grid}>
        <div className={styles.board}>

          { game?.round_1.board.categories.map((category) => {
            return ( <>
              <CategoryComponent category={category.title} />
              { category.clues.map((clue, index) => {
                let price = (index + 1) * 200;
                return (
                  index <= 4 ? <CardComponent answer={clue.answer} question={clue.question} price={price} onPress={() => {}} /> : null  
                );
              }) }
            </> );
          }) }



        </div>
        <div>asdas</div>
      </div>
      
    </div>
  )
}

export default Display;