import { useEffect, useState, ChangeEvent } from "react";
import css from './App.module.css'
import RestartIcon from './svgs/restart.svg'
import logoImage from './assets/devmemory_logo.png'

import { InfoItem} from './components/InfoItem'
import { Button } from './components/Button'
import { GridItem } from "./components/GridItem";

import {items} from './data/items'
import { GridItemType } from "./types/GridItemType";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

function App() {

  const[playing, setPlaying] = useState<boolean>(false)
  const[timeElapsed, setTimeElapsed] = useState<number>(0)
  const[moveCount, setMoveCount] = useState<number>(0)
  const[shownCount, setShownCount] = useState<number>(0)
  const[gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) {
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(() => {
    if(shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2) {

        

        // v1 - se eles sao iguais, torna-los permanentes
        if(opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems]
          for(let i in tmpGrid) {
            if(tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0)
          

        } else {
          // se nao sao iguals, feche todos os shown
          setTimeout(() => {
            let tmpGrid = [...gridItems]
            for(let i in tmpGrid) {
              tmpGrid[i].shown = false;
          }
          setGridItems(tmpGrid);
          setShownCount(0)
          }, 1000)

        }
        

        setMoveCount(moveCount => moveCount + 1)

      }
    }
  }, [shownCount, gridItems])

  //verify if game is over

  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false);

    }
  }, [moveCount, gridItems])
  
const resetAndCreateGrid = () => {
  // step 1 - resetar o jogo
  setTimeElapsed(0)
  setMoveCount(0)
  setShownCount(0)
  setGridItems([])

  // 2.0 criar um grid vazio
  let tmpGrid: GridItemType[] = []
  for(let i = 0; i < (items.length * 2); i++) {
    tmpGrid.push({
      item: null,
      shown: false, 
      permanentShown: false
    })
  }
  // 2.2 preencher o grid
  for(let w = 0; w < 2; w++) {
    for(let i = 0; i < items.length; i++) {
      let pos = -1;
      while(pos < 0 || tmpGrid[pos].item !== null ) {
        pos = Math.floor(Math.random() * (items.length * 2));
      }
      
      tmpGrid[pos].item = i;
      
    }
  }

  //2.3 jogar no state
  setGridItems(tmpGrid);

  // step 3 -  começar o jogo
  setPlaying(true)
}
  
const handleItemClick = (index: number) => {
  if(playing && index !== null && shownCount < 2) {
    let tmpGrid = [...gridItems]

    if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
      tmpGrid[index].shown = true;
      setShownCount(shownCount + 1)
    }

    setGridItems(tmpGrid);
  }
}

  return (
    
    <div className={css.main}>

      <div className={css.InfoArea}>
        <div className={css.Logo}>
          <img src={logoImage} alt="" width={200} />
        </div>
        <div className={css.Info}>
          showCount: {shownCount}
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </div>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />

      </div>
      <div className={css.GridArea}>
        <div className={css.Grid}>
            {gridItems.map((item, index)=>(
              <GridItem key={index} item={item} onClick={()=> handleItemClick(index)} />
            ))}
        </div>
      </div>

    </div>
  );
}

export default App;
