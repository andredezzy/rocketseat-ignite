import { Heading, Text, styled } from '@ignite-ui/react'

export const Hero = styled('div', {
  [`${Heading}`]: {
    fontWeight: 700,

    '@media (max-width: 640px)': {
      fontSize: '$6xl',
    },
  },

  [`${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})
