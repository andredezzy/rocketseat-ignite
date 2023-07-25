import { Heading, Text, styled } from '@ignite-ui/react'

export const Hero = styled('div', {
  [`> ${Heading}`]: {
    '@media (max-width: 640px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    color: '$gray200',
  },
})
