import { Box, Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import { FormAnnotation } from './styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
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
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit, formState } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    await router.push(`/register?username=${data.username}`)
  }

  return (
    <>
      <Box
        as="form"
        className="grid grid-cols-[1fr] sm:grid-cols-[1fr_auto] gap-2 mt-4"
        onSubmit={handleSubmit(handleClaimUsername)}
      >
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />

        <Button
          size="sm"
          type="submit"
          className="bg-[var(--colors-ignite500)]"
          disabled={formState.isSubmitting}
        >
          Reservar
          <ArrowRight />
        </Button>
      </Box>

      <FormAnnotation className="mt-2">
        <Text size="sm">
          {formState.errors.username
            ? formState.errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
