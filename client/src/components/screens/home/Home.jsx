import Layout from '../../layout/Layout.jsx'
import styles from './Home.module.scss'
import {useQuery} from "react-query";
import StatementService from "../../../services/statement.service.js";

function Home() {
    const { data } = useQuery(['get statement'], {
        queryFn: () => StatementService.getUsersStatements(),
        select: ({ data }) => data,

    });


  return (
    <Layout>
     <div className={styles.center}>
         {
             data?.statements?.map(statement=>(
                 <div class={styles.statement}>
                         <h2>номер: {statement.autoNumber}</h2>
                         <h2>описание: {statement.description}</h2>
                         <h2>статус: {statement.status}</h2>
                 </div>
             ))
         }
     </div>
    </Layout>
  )
}

export default Home
