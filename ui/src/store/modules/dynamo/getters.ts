// profile/getters.ts
import { GetterTree } from 'vuex'
import { SessionState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<SessionState, RootState> = {
  isInDarkMode(state): boolean {
    return state.isInDarkMode
  },
}
