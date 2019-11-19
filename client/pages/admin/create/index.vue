<template lang="pug">
.page-admin-create.container
  section.create-post-form
    h2.page-title 포스트 생성
    p 새로운 글을 작성합니다.
    post-form(@submit="onSubmitted")
</template>

<script>
// axios 패키지 로드
import axios from 'axios'
import PostForm from '@/components/Admin/PostForm'

export default {
  layout: 'admin',
  components: { PostForm },
  head(){
    return{
      title: '포스트 작성'
    }
  },
  methods: {
    // 커스텀 이벤트 수신 메서드 정의
    onSubmitted(newPost) {
    // 스토어에 createPost 디스패치
      this.$store
        .dispatch('createPost', newPost)
        .then(() =>{ // 플러그인 코드 적용
        this.$notify({
          group: 'admin-noti',
          title: '등록 성공!',
          text: '새 포스트 등록에 성공했습니다.',
          duration: 2000,
          speed: 400
        })
        // 1초 뒤, 관리자 메인 페이지로 이동
        setTimeout(() => { this.$router.push('/admin') }, 1000)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/styles/config"

.page-title
  margin-bottom: 0
  font-family: Changa, Sans-Serif
  letter-spacing: -0.03em

p
  margin-top: 0
  color: rgba(#000, 0.5)
  font-size: 13px
  letter-spacing: -0.06em
</style>