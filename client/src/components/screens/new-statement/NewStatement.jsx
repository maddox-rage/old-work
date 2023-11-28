import Layout from "../../layout/Layout"
import styles from "./NewStatement.module.scss"
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import AuthService from "../../../services/auth.service.js";
import Field from "../../ui/field/Field.jsx";
import Button from "../../ui/button/Button.jsx";
import Loader from "../../ui/Loader.jsx";
import { useCreateStatement } from "./useCreateStatement";

const NewStatement = () => {
    const { errors,
        handleSubmit,
        isLoading,
        onSubmit,
        register } =
        useCreateStatement()
    return (
        <Layout>
            <div className={styles.center}>
                <h2>Create Statement</h2>
                {isLoading && <Loader />}
                <form  onSubmit={handleSubmit(onSubmit)}
                >
                    <Field
                        error={errors?.description?.message}
                        name='description'
                        register={register}
                        options={{
                            required:"description is required"
                        }}
                        type='text'
                        placeholder='enter description'
                    />
                    <Field
                        error={errors?.autoNumber?.message}
                        name='autoNumber'
                        register={register}
                        options={{
                            required:"autoNumber is required"
                        }}
                        type='text'
                        placeholder='enter autoNumber'
                    />
                    <Button>Submit</Button>
                </form>
            </div>
        </Layout>
    )
}

export default NewStatement