import Layout from "../../layout/Layout"
import {useQuery} from "react-query";
import StatementService from "../../../services/statement.service.js";
import styles from "./Statement.module.scss"
import { Link } from 'react-router-dom';

const Statement = ()=>{
    const { data } = useQuery(['get statement'], {
        queryFn: () => StatementService.getAllStatements(),
        select: ({ data }) => data
    });
    return(
        <Layout>
            <div className={styles.center}>
                {
                    data?.statements?.map(statement=>(
                        <div className={styles.statement}>
                            <Link to={`/statement/${statement.id}`}>
                            <h2>номер:{statement.autoNumber}</h2>
                            <h2>описание: {statement.description}</h2>
                            <h2>статус: {statement.status}</h2>
                            <h2>фамилия: {statement.user.lastName}</h2>
                            <h2>имя: {statement.user.firstName}</h2>
                            <h2>отчество: {statement.status}</h2>
                            </Link>
                        </div>

                    ))
                }

            </div>
        </Layout>
    )
}
export default Statement