import css from './styles.module.css' 

type Props = {
    label: string;
    icon: any;
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Button = ({label, icon, onClick}: Props) => {
    return (
        <div onClick={onClick} className={css.main}>

            <div className={css.iconArea}>
                <div className={css.icon}>
                    <img src={icon} alt="" />
                </div>
                
            </div>
            <div className={css.label}>{label}</div>
        </div>
    )
}