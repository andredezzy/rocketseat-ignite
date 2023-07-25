import {
  Box,
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Form, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'O nome de usuário deve ter pelo menos 3 caracteres',
    })
    .max(20)
    .regex(/^[a-z0-9-]+$/i, {
      message: 'O nome de usuário só pode conter letras, números e traços',
    })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const { register, handleSubmit, setValue, formState } =
    useForm<RegisterFormData>({
      resolver: zodResolver(registerFormSchema),
    })

  const router = useRouter()

  useEffect(() => {
    if (router.query?.username) {
      setValue('username', router.query?.username)
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

  return (
    <main className="max-w-xl mx-auto mt-20 mb-4">
      <Header className="px-6">
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>

        <Text className="mb-6">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Box
        as="form"
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleSubmit(handleRegister)}
      >
        <label className="flex flex-col gap-2">
          <Text size="sm">Nome de usuário</Text>

          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />

          {formState.errors.username && (
            <Text size="sm" className="text-red-400">
              {formState.errors.username.message}
            </Text>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Nome completo</Text>

          <TextInput placeholder="Seu nome" {...register('name')} />

          {formState.errors.name && (
            <Text size="sm" className="text-red-400">
              {formState.errors.name.message}
            </Text>
          )}
        </label>

        <Button
          type="submit"
          className="bg-[var(--colors-ignite500)]"
          disabled={formState.isSubmitting}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </Box>
    </main>
  )
}
