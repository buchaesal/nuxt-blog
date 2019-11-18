<template lang="pug">
.page-admin-post.container
  section.update-form
    h2.page-title 포스트 수정
    p 작성된 글을 수정합니다.
    post-form(:post="loadedPost", @submit="onSubmitted")
</template>

<script>
import PostForm from '@/components/Admin/PostForm'

export default {
  layout: 'admin',
  name: 'SinglePost',
  components: { PostForm },
  computed: {
    loadedPost() {
      const id = this.$route.params.postId
      return this.$store.getters.loadedPosts.find(post => post.title === id)
    }
  },
  methods: {
    onSubmitted(editedPost) {
       // 스토어에 updatePost 디스패치
      this.$store
        .dispatch('updatePost', editedPost)
        .then(res => this.$router.push('/admin'))
    }
  }
}
</script>