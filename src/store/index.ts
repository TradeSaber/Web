import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import { API_URL } from '../variables'
import { User } from '../types'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      status: '',
      token: localStorage.getItem('token') || '',
      user: JSON.parse(localStorage.getItem('user') || '{}') || {} as User
  },
  mutations: {
    authRequest(state) {
      state.status = ''
    },
    authSuccess(state, { token, user }) {
      state.status = ''
      state.token = token
      state.user = user
    },
    authError(state) {
      state.status = ''
    },
    logout(state) {
      state.status = '',
      state.token = ''
    }
  },
  actions: {
    login({commit}, code) {
      return new Promise((resolve, reject) => {
        commit('authRequest')
        axios({ url: API_URL + '/authorize/callback?code=' + code, method: 'GET' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          commit('authSuccess', { token, user })
          resolve(resp)
        })
        .catch(err => {
          commit('authError')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  }
});