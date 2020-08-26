import { ActionTree } from 'vuex'
import { SessionState } from './types'
import { RootState } from '../types'

export const actions: ActionTree<SessionState, RootState> = {
  updateDarkModePreference({ commit }, newPreference: boolean) {
    commit('UPDATE_DARK_MODE', newPreference)
  },
}
