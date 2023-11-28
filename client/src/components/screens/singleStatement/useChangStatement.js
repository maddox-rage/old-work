import { useMutation } from 'react-query'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import StatementService from "../../../services/statement.service.js";

export const useChangStatement = () => {

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
        ({ id, status }) => StatementService.UpdateStatement(id, status),
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
