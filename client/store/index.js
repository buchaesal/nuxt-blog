// Vuex 패키지 불러오기
import Vuex from 'vuex'
import axios from 'axios'
import https from 'https'

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

// 스토어 생성 함수 정의
const createStore = () => {
  // Vuex.Store 객체 생성 반환
  return new Vuex.Store({
    // 상태(데이터)
    state: { loadedPosts: [] },
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
      }
    },
    // 액션(비동기 처리 ⟹ 쓰기 커밋)
    actions: {
        async nuxtServerInit({commit}, context) {
            // axios를 통해 Firebase 데이터베이스에 데이터 요청
            await axiosInstance.get('https://vuejs-http-9bdb4.firebaseio.com/posts.json')
                 // 응답 받은 데이터 출력
                 .then(({data}) => {
                    const postsList = []
                    for (let key in data) {
                       // Firebase 데이터베이스의 데이터 식별자를 id 값으로 저장
                        postsList.push({ ...data[key], id: key })
                    }
                    commit('setPosts', postsList)
                  })
                 .catch(e => console.error(e))
          },
          createPost({ commit }, createdPost) {
            createdPost.createdDate = new Date().toLocaleString()
            createdPost.updatedDate = createdPost.createdDate
            // Firebase 데이터베이스와 통신
            return axios
              .post('https://vuejs-http-9bdb4.firebaseio.com/posts.json', createdPost)
              .then(res => {
                // 통신이 성공하면 뮤테이션에 커밋
                commit('createPost', { ...createdPost, id: res.data.name })
              })
              .catch(e => console.error(e))
          },
          updatePost({ commit }, updatedPost) {
            updatedPost.updatedDate = new Date().toLocaleString()
            return axios
              .put(
                `https://vuejs-http-9bdb4.firebaseio.com/posts/${updatedPost.id}.json`,
                updatedPost
              )
              .then(res => {
                commit('updatePost', updatedPost)
              })
              .catch(e => console.error(e))
          }
    },
    // 읽기
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  })
}

// createStore 함수 모듈 기본으로 내보내기
export default createStore;