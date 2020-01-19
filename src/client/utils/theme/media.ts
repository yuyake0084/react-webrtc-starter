// @ts-nocheck

import { css } from 'styled-components'

export const media = {
  desktop: (...args: Array<any>) => css`
    @media (min-width: 1000px) {
      ${css(...args)};
    }
  `,
  tablet: (...args: Array<any>) => css`
    @media (max-width: 750px) {
      ${css(...args)};
    }
  `,
  phone: (...args: Array<any>) => css`
    @media (max-width: 500px) {
      ${css(...args)}
    }
  `,
}
