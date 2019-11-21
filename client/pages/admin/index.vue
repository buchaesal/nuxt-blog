<template lang="pug">
.page-admin.container
  section.create-post
    h2.page-title 포스트 생성
    p 새로운 글을 작성합니다.
    ui-button(type="button"
              @click="$router.push('/admin/create')") 생성
  section.posts
    h2.page-title 포스트 리스트
    p 작성된 글들 입니다.
    post-list(isAdmin, :posts="loadedPosts")
</template>

<script>
import PostList from '@/components/Posts/PostList'
import UiButton from '@/components/UI/UiButton'

export default {
  layout: 'admin',
  middleware: 'auth',
  components: { PostList, UiButton },
    head(){
    return{
      title: '관리자'
    }
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/styles/config"

.page-admin
  padding: 20px

.create-post
  border-bottom: 1px solid rgba(#000, 0.2)
  padding-bottom: 30px

.page-title
  margin-bottom: 0
  font-family: Changa, Sans-Serif
  letter-spacing: -0.03em

.posts
    margin-top: 30px

p
  margin-top: 0
  color: rgba(#000, 0.5)
  font-size: 13px
  letter-spacing: -0.06em

.button
  cursor: pointer
  border: none
  border-radius: 4px
  padding: 0.6em 1.2em
  background: rgba(darken($point-color, 40%), 0.7)
  color: #fff
  font-weight: bold
  transition: all 0.4s ease-out
  &:hover,
  &:focus
    background: darken($point-color, 20%)
</style>