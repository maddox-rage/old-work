import { useMutation } from 'react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import StatementService from '../../../services/statement.service'

export const useCreateStatement = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: 'onChange'
    })


    const { mutate, isLoading } = useMutation(
        ['auth'],
        ({ description, autoNumber }) => StatementService.StatementCreate(description, autoNumber),
        {
            onSuccess: () => {
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
