import { Controller, useForm } from "react-hook-form"
import { useLoginMutation } from "./services/login"
import { useEffect } from "react"
import { TextField } from "@mui/material"

export default function LoginForm() {
  const { control, handleSubmit, register } = useForm<{
    username: string
    password: string
  }>()

  const [login, { isError, isLoading, isSuccess, error }] = useLoginMutation()

  const onSubmit = handleSubmit(
    data => (console.log(data) as any) || login(data),
  )

  useEffect(() => {
    if (isSuccess) {
      alert("Login successful")
    }
    if (isError) {
      alert("Login failed")
      console.log(error)
    }
    if (isLoading) {
      alert("Loading...")
    }
  }, [isSuccess, isError, isLoading])

  return (
    <form onSubmit={onSubmit}>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Username" />}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Password" type="password" />
        )}
      />
      <input type="submit" />
    </form>
  )
}
