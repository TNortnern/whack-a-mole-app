export default {
  state: () => ({
    score: 0,
  }),
  actions: {
    resetGame({ state, commit }) {
      commit('SET_SCORE', 0)
    },
    incrementScore({ commit, state }) {
      const incrementedScore = state.score + 1
      commit('SET_SCORE', incrementedScore)
    },
  },
  mutations: {
    SET_SCORE(state, number) {
      state.score = number
    },
  },
}
