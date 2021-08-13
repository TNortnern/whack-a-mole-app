const defaultTimer = 100
export default {
  state: () => ({
    score: 0,
    timer: defaultTimer,
    isStarted: false,
    startedTimer: defaultTimer,
  }),
  actions: {
    resetGame({ state, commit }) {
      commit('SET_SCORE', 0)
      commit('SET_TIMER', state.startedTimer)
      commit('SET_GAME', false)
    },
    incrementScore({ commit, state }) {
      const incrementedScore = state.score + 1
      commit('SET_SCORE', incrementedScore)
    },
    toggleGame({ state, commit, dispatch }) {
      commit('SET_GAME', !state.isStarted)
      if (!state.isStarted) {
        dispatch('resetGame')
      } else {
        const countdown = setInterval(() => {
          if (state.isStarted) {
            if (state.timer > 0) {
              commit('SET_TIMER', state.timer - 1)
            } else {
              clearInterval(countdown)
              dispatch('resetGame')
            }
          }
        }, 100)
      }
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
