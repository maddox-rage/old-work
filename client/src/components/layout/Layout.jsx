import Header from "./header/Header"
import styles from "./Layout.module.scss"
import cn from 'clsx'
// import { useCheckToken } from '../../hooks/useCheckToken'

const Layout = ({ children, bgImage, heading = '', backLink = '/' })=>{
    return(
        <div>
            <section
                className={cn(styles.wrapper, {
                    [styles.otherPage]: !!heading
                })}
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <Header backLink={backLink} />

                {heading && <h1 className={styles.heading}>{heading}</h1>}

                {children && <div>{children}</div>}
            </section>
        </div>
    )
}
export default Layout