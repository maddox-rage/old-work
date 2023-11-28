import Layout from "../../layout/Layout.jsx";
import Field from "../../ui/field/Field.jsx";
import Button from "../../ui/button/Button.jsx";
import styles from "./Auth.module.scss"
import Loader from "../../ui/Loader.jsx";
import {useRegisterPage} from "./useRegisterPage.js";


const Register = ()=>{
    const { errors,
        handleSubmit,
        isLoading,
        onSubmit,
        register } =
        useRegisterPage()

    return(
            <Layout>
                <div className={styles.center}>
                    <h2>Register</h2>
                    {isLoading && <Loader />}
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <Field
                            error={errors?.email?.message}
                            name='email'
                            register={register}
                            options={{
                                required:"email is required"
                            }}
                            type='text'
                            placeholder='enter email'
                        />
                        <Field
                            error={errors?.fullName?.message}
                            name='fullName'
                            register={register}
                            options={{
                                required:"fullName is required"
                            }}
                            type='text'
                            placeholder='enter fullName'
                        />
                        <Field
                            error={errors?.numberPhone?.message}
                            name='numberPhone'
                            register={register}
                            options={{
                                required: 'numberPhone is required'
                            }}
                            type='text'
                            placeholder='enter numberPhone'
                        />
                        <Button>Submit</Button>
                        <a href="/auth">have a acc?</a>
                    </form>
                </div>
            </Layout>
    )
}
export default Register