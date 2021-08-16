const defaultMinutes = 5
const defaultSeconds = 30
const minutesToMillis = (val) => val * 60000
const secondsToMillis = (val) => val * 1000
const defaultTimer =
  minutesToMillis(defaultMinutes) + secondsToMillis(defaultSeconds)
export default {
  state: () => ({
    score: 0,
    timer: defaultTimer,
    time: {
      minutes: defaultMinutes,
      seconds: defaultSeconds,
    },
    isStarted: false,
    randomizeAppearTimeOnClick: false,
    startedTimer: defaultTimer,
    amountOfMoles: 6,
    hideControlsOnStart: false,
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
              commit('SET_TIMER', state.timer - 1000)
            } else {
              clearInterval(countdown)
              dispatch('resetGame')
            }
          } else {
            clearInterval(countdown)
          }
        }, 1000)
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
    SET_RANDOMIZE_APPEAR_TIME(state, value) {
      state.randomizeAppearTimeOnClick = value
    },
    SET_MOLE_AMOUNT(state, value) {
      // minimum value is 1
      if (Number(state.amountOfMoles) <= 1 && value < 1) {
        state.amountOfMoles = '1'
      } else {
        state.amountOfMoles = value
      }
    },
    SET_HIDE_CONTROLS_ON_START(state, value) {
      state.hideControlsOnStart = value
    },
    SET_TIME(state, { key, value }) {
      state.time[key] = value
      state.timer =
        minutesToMillis(state.time.minutes) +
        secondsToMillis(state.time.seconds)
    },
  },
}
