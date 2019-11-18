// Vuex 패키지 불러오기
import Vuex from 'vuex';

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
      }
    },
    // 액션(비동기 처리 ⟹ 쓰기 커밋)
    actions: {
        nuxtServerInit(vuexContext, context) {
            // 스토어 객체의 commit 추출 (비 구조화 할당)
            const { commit } = vuexContext
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                // 뮤테이션의 setPosts 메서드 실행 (데이터 저장)
                commit('setPosts', [
                  {
                    id: '1',
                    title: '빅 데이터',
                    thumbnail: '//goo.gl/mJ5Vsy',
                    content:
                      '빅 데이터란? 기존 데이터베이스 관리도구의 능력을 넘어서는 대량의 정형 또는 비정형 데이터 집합을 포함한 데이터로부터 가치를 추출하고 결과를 분석하는 기술이다.'
                  },
                  {
                    id: '2',
                    title: '머신 러닝',
                    thumbnail: '//goo.gl/HoiVkE',
                    content:
                      '머신 러닝은 인공 지능의 한 분야로, 컴퓨터가 학습할 수 있도록 하는 알고리즘과 기술을 개발하는 분야를 말한다.'
                  }
                ])
                resolve()
              }, 1000)
              // reject(new Error())
            })        
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