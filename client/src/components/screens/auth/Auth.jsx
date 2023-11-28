import Layout from "../../layout/Layout"
import Field from "../../ui/field/Field"
import styles from "./Auth.module.scss"
import Button from "../../ui/button/Button";
import Loader from "../../ui/Loader.jsx";
import {useAuthPage} from "./useAuthPage.js";

const Auth = ()=>{
    const { errors,
        handleSubmit,
        isLoading,
        onSubmit,
        register } =
        useAuthPage()
    return(
        <Layout>
         <div className={styles.center}>
            <h1>Login</h1>
             {isLoading && <Loader />}
        <form  onSubmit={handleSubmit(onSubmit)}
>
        <Field
                        error={errors?.login?.message}
                        name='login'
                        register={register}
                        options={{
                            required:"login is required"
                        }}
                        type='text'
                        placeholder='enter login'
                    />
                    <Field
                        error={errors?.password?.message}
                        name='password'
                        register={register}
                        options={{
                            required:"password is required"
                        }}
                        type='password'
                        placeholder='enter password'
                    />
                    <Button>Submit</Button>
        </form>
        <a href="/register">dont have a acc?</a>
         </div>
        </Layout>
    )
}
export default Auth