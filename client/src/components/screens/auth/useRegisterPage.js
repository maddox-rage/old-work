import { useMutation } from 'react-query'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import AuthService from '../../../services/auth.service'

export const useRegisterPage = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset
    } = useForm({
    mode: 'onChange'
})

    const { isAuth, setIsAuth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    const { mutate, isLoading } = useMutation(
        ['auth'],
        ({ login, password, email, fullName, numberPhone}) => 
        AuthService.register(login, password, email, fullName, numberPhone),
        {
            onSuccess: () => {
                setIsAuth(true)
                reset()
            }
        }
    )

    const onSubmit = data => {
        mutate(data)
        console.log(data)
    }

    return useMemo(
        () => ({
            register,
            handleSubmit,
            errors,
            isLoading,
            onSubmit
        }),
        [errors, isLoading]
    )
}