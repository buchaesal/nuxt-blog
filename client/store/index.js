// Vuex 패키지 불러오기
import Vuex from 'vuex'

// nuxt.config.js 파일의 env 속성 공유
const api = process.env.baseUrl

// 스토어 생성 함수 정의
const createStore = () => {
  // Vuex.Store 객체 생성 반환
  return new Vuex.Store({
    // 상태(데이터)
    state: { 
             loadedPosts: [],
             token: null 
            },
    // 쓰기(동기 처리)
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      createPost(state, createdPost) {
        // 스토어의 loadedPosts 데이터에 createdPost 추가
        state.loadedPosts.push(createdPost)
      },
      updatePost(state, updatedPost) {
        const idx = state.loadedPosts.findIndex(
          post => post.id === updatedPost.id
        )
        state.loadedPosts[idx] = updatedPost
      },
      setToken(state, token) {
        state.token = token
      }
    },
    // 액션(비동기 처리 ⟹ 쓰기 커밋)
    actions: {
        async nuxtServerInit({commit}, { app }) {
          try {
            // nuxtServerInit 에서는
            // axios.get() -> app.$axios.$get()
            // nuxt.config.js에서 baseURL 설정했기 때문에
            // 상대 경로만 설정하면 되고, 통신 결과는 데이터만
            // 추출되기 때문에 res.data가 아닌, data를
            // 바로 사용할 수 있다.
            const data = await app.$axios.$get('/posts.json')
            const postsList = []
            for (let key in data) {
              postsList.push({ ...data[key], id: key })
            }
            commit('setPosts', postsList)
          } catch (e) {
            console.error(e)
          }
          },
          setPosts({ commit }, posts) {
            commit('setPosts', posts)
          },
          createPost({ commit, getters }, createdPost) {
            createdPost.createdDate = new Date().toLocaleString()
            createdPost.updatedDate = createdPost.createdDate
          // actions 메서드 내부에서는 this.$axios를 사용
          // baseURL 설정에 따라 상대 경로만 설정
          // res.data가 아닌, data 바로 사용
          return this.$axios
          // getters.token 값을 auth 에 설정
          .$post(`/posts.json?auth=${getters.token}`, createdPost)
          .then(data => {
            commit('createPost', { ...createdPost, id: data.name })
          })
          .catch(e => console.error(e))
          },
          updatePost({ commit, getters }, updatedPost) {
            updatedPost.updatedDate = new Date().toLocaleString()
           // actions 메서드 내부에서는 this.$axios를 사용
          // baseURL 설정에 따라 상대 경로만 설정
          // res.data가 아닌, data 바로 사용
          return this.$axios
          // getters.token 값을 auth 에 설정
          .$put(`/posts/${updatedPost.id}.json?auth=${getters.token}`, updatedPost)
          .then(data => {
            commit('updatePost', updatedPost)
          })
          .catch(e => console.error(e))
          },
          authUser({ commit }, authData) {
  
            const API_KEY = process.env.APIKey
          
            // this.isLogin ⟹ authData.isLogin 변경
            const authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${
              !authData.isLogin ? 'signupNewUser' : 'verifyPassword'
            }?key=${API_KEY}`
          
            // axios 프로미스(Promise) 반환
            return this.$axios
              .$post(authURL, {
                // this.email ⟹ authData.email 변경
                email: authData.email,
                // this.password ⟹ authData.password 변경
                password: authData.password,
                returnSecureToken: true
              })
              .then(res => {
                // 통신에 성공하면 토큰을 저장하는 setToken 뮤테이션 메서드를 실행
                commit('setToken', res.idToken)
              })
              .catch(e => console.error(e))
              
          }
    },
    // 읽기
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      token(state) {
        return state.token
      }
    }
  })
}

// createStore 함수 모듈 기본으로 내보내기
export default createStore;