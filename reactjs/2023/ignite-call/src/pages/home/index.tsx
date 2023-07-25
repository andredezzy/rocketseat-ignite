import { Heading, Text } from '@ignite-ui/react'

import appPreviewImage from '../../assets/app-preview.png'
import Image from 'next/image'
import { Hero } from './styles'
import { ClaimUsernameForm } from '@/components/ClaimUsernameForm'

export default function Home() {
  return (
    <div className="flex items-center gap-20 ml-auto max-w-[calc(100vw-(100vw-1160px)/2)] h-screen">
      <Hero className="max-w-lg px-10">
        <Heading as="h1" size="4xl" className="font-bold">
          Agendamento descomplicado
        </Heading>

        <Text size="xl" className="mt-2">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <div className="pr-8 overflow-hidden hidden sm:block">
        <Image
          src={appPreviewImage}
          height={442}
          width={827}
          quality={100}
          priority
          alt="App preview"
          className="min-w-[827px]"
        />
      </div>
    </div>
  )
}
