// profile/mutations.ts
import { MutationTree } from 'vuex'
import { SessionState } from './types'

export const mutations: MutationTree<SessionState> = {
  UPDATE_DARK_MODE(state, payload: boolean) {
    state.isInDarkMode = payload
  },
}
