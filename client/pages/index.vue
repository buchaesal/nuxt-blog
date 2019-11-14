<template lang="pug">
.page-home
  // loadedPosts 데이터를 
  // PostList 컴포넌트 posts 속성으로 전달
  post-list(:posts="loadedPosts")
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
  components: { PostList },
   // 비동기로 받아온 데이터를 처리한 후,
  // 페이지 렌더링을 수행
  asyncData(context, callback) {
    console.log(context);
    // 약 1초 가량 지연 이후 함수 실행
    setTimeout(() => {
      // 오류 처리는 불필요하니 첫번째 인자는 null 설정
      // 두번째 인자로 설정되는 객체는 data 와 병합됨
      callback(null, {
        loadedPosts: [
          {
            id: '1',
            title: '빅 데이터',
            thumbnail: '//goo.gl/mJ5Vsy',
            content: '빅 데이터란? 기존 데이터베이스 관리도구의 능력을 넘어서는 대량의 정형 또는 비정형 데이터 집합을 포함한 데이터로부터 가치를 추출하고 결과를 분석하는 기술이다.'
          },
          {
            id: '2',
            title: '머신 러닝',
            thumbnail: '//goo.gl/HoiVkE',
            content: '머신 러닝은 인공 지능의 한 분야로, 컴퓨터가 학습할 수 있도록 하는 알고리즘과 기술을 개발하는 분야를 말한다.'
          }
        ]
      })
    }, 1200)
  },
  data() {
    return {
      loadedPosts: []
    }
  }
 }
</script>

<style lang="sass" scoped>
@import "~assets/styles/config"

a
  text-decoration: none
  color: darken($color, 20%)
  transition: all 0.4s ease
  &:hover .post-content,
  &:active .post-content
    background-color: rgba($color, 0.26)

@media (min-width: 768px)
  .intro h1
    font-size: 2rem
</style>