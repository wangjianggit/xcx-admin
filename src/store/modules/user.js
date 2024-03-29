import { login, logout, getInfo, getmytoken } from '@/api/login'
import { getToken, setToken, removeToken, getLogin, setLogin, removeLogin } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    isLogin: false, //判断是否登录false 未登录  true 已登录
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    }
  },

  actions: {
    // 获取token
    GetMyToken({ commit }, appinfo) {
      return new Promise((resolve, reject) => {
        getmytoken(appinfo.appid, appinfo.appsecret).then(response => {
          const data = response
          console.log(response)
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          // debugger
          console.log(response)
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          setLogin(true)
          commit('SET_LOGIN', true)
          console.log(user)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {

      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          console.log(state)
          removeToken()
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeLogin()
        resolve()
      })
    }
  }
}

export default user
