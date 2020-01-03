import { State } from '@client/reducers'

export const connectionsSelector = ({ connections }: State): State['connections'] => connections
