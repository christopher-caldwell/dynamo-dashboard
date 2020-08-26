import { ActionTree } from 'vuex'
import { SessionState } from './types'
import { RootState } from '../types'

interface DynamoSettings {
  tableName: string
}

export const actions: ActionTree<SessionState, RootState> = {
  updateDynamoSettings({ commit }, newSettings: DynamoSettings) {
    commit('UPDATE_DARK_MODE', newSettings)
  },
}
