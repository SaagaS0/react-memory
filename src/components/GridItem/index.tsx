import { GridItemType } from '../../types/GridItemType'
import css from './style.module.css'
import b7Svg from '../../svgs/b7.svg'
import {items} from '../../data/items';

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    return (

        <div onClick={onClick} className={css.main}>

            {item.permanentShown === false && item.shown === false &&
                <div className={css.Icon}><img src={b7Svg} alt="" /></div>
            }
            {(item.permanentShown || item.shown) && item.item!== null &&
                <div className={css.Icon}><img src={items[item.item].icon} alt="" /></div>
            }
        </div>
    )
}