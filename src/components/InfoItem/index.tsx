import css from './styles.module.css'


type Props = {
    label:string
    value:string
}

export const InfoItem = ({label, value}: Props) => {
    return (
        <div className={css.main}>
            <div className={css.label}>{label}</div>
            <div className={css.value}>{value}</div>
        </div>
    )
}
