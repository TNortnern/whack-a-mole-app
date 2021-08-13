export default {
  state: () => ({
    score: 0,
    timer: 2000,
    isStarted: false,
    startedTimer: 2000,
  }),
  actions: {
    resetGame({ state, commit }) {
      commit('SET_SCORE', 0)
      commit('SET_TIMER', state.startedTimer)
    },
    incrementScore({ commit, state }) {
      const incrementedScore = state.score + 1
      commit('SET_SCORE', incrementedScore)
    },
    toggleGame({ state, commit, dispatch }) {
      const gameStarted = state.isStarted
      if (gameStarted) {
        dispatch('resetGame')
      }
      commit('SET_GAME', !gameStarted)
    },
  },
  mutations: {
    SET_SCORE(state, number) {
      state.score = number
    },
    SET_TIMER(state, time) {
      state.timer = time
    },
    SET_GAME(state, value) {
      if (value) {
        // track the timer the game was set on so when a user resets, it'll default to that time
        state.startedTimer = state.timer
      }
      state.isStarted = value
    },
    SET(state, { key, value }) {},
  },
}
