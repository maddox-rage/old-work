import styles from "./Box.module.scss"

const Box = ({ description, name, status, number })=>{
    return(
        <div className={styles.box}>
          <div className={styles.group}>
            <div className={styles.overlapGroup}>
              <div className={styles.textWrapper}>Описание: {description}</div>
              <div className={styles.div}>Имя: {name}</div>
              <div className={styles.textWrapper2}>Статус: {status}</div>
              <div className={styles.textWrapper3}>Номер автомобиля: {number}</div>
            </div>
            </div>
          </div>
    )
}
export default Box