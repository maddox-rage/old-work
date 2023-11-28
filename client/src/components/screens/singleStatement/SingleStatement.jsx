import { useQuery, useMutation} from "react-query";
import StatementService from "../../../services/statement.service.js";
import Layout from "../../layout/Layout.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Field from "../../ui/field/Field.jsx";
import Button from "../../ui/button/Button.jsx";
import {useChangStatement} from "./useChangStatement.js";
import styles from "../../ui/button/Button.module.scss"
const Statement = () => {
    const { id } = useParams();
    const { data } = useQuery(["get statement", id], {
        queryFn: () => StatementService.getStatementById(id),
        select: ({ data }) => data
    });
    const { errors,
        handleSubmit,
        onSubmit,
        register } =
        useChangStatement()
    const navigate = useNavigate()
    const deleteStatementMutation = useMutation(
        () => StatementService.DeleteStatement(id),
        {
            onSuccess: () => {
                navigate("/");
            }
        }
    );
    const handleDeleteStatement = () => {
        deleteStatementMutation.mutate()
    };
    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={styles.statement}>
                    <h2>{data?.statement.status}</h2>
                    <h2>{data?.statement.autoNumber}</h2>
                    <h2>{data?.statement.description}</h2>
                </div>
                <form  onSubmit={handleSubmit(onSubmit)}
                >
                    <Field
                        error={errors?.id?.message}
                        name='id'
                        register={register}
                        options={{
                            required:"id is required"
                        }}
                        type='text'
                        placeholder={data?.statement.id}
                    />
                    <Field
                        error={errors?.status?.message}
                        name='status'
                        register={register}
                        options={{
                            required:"status is required"
                        }}
                        type='text'
                        placeholder='enter status'
                    />
                    <Button>Submit</Button>
                </form>
                <button className={styles.button} onClick={handleDeleteStatement}>Delete Statement</button>
            </div>
        </Layout>
    );
};

export default Statement;