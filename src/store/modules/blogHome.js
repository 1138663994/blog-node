export default function (http) {
  const state = {
    dataList: [],
    demo: 'this is demo'
  }
  const mutations = {
    SET_DATALIST (state, data) {
      state.dataList = data
    }
  }
  const actions = {
    setDatalist ({commit}, param) {
      let params = {
        pageIndex: 1
      }
      return http.post('/public/article/blogHomeList', params).then(resp => {
        // console.log('datalist', resp.data.rows)
        commit('SET_DATALIST', resp.data.rows)
      }).catch(err => {
        console.log('err', err.toString())
      })
    }
  }
  return {
    state,
    mutations,
    actions
  }
}
