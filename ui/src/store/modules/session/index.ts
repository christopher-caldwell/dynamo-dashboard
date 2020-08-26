// profile/index.ts
import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { SessionState } from './types'
import { RootState } from '../types'

export const session: Module<SessionState, RootState> = {
  namespaced: true,
  state: {
    isInDarkMode: false,
  },
  getters,
  actions,
  mutations,
}
