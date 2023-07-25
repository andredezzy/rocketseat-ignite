import { Box, Heading, Text, styled } from '@ignite-ui/react'

export const Header = styled('div', {
  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
  },
})
