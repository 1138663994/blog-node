console.log('page')
const page = {
  state: {
    count: 0,
    demo: 'this is demo'
  },
  mutations: {
    SET_COUNT (state, params) {
      state.count = params
    }
  },
  actions: {
    set_count ({commit}, params) {
      console.log(params)
      commit('SET_COUNT', params)
    }
  }
}

export default page
