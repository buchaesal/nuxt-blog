<template lang="pug">
  .page-single-post
    section.post
      h1.post-title {{ loadedPost.title }}
      .post-info
        span.post-author {{ loadedPost.author }}
        span.post-data {{ loadedPost.updatedDate }}
      img.post-image(:src="loadedPost.thumbnail", alt, width="600")
      p.post-content {{ loadedPost.content }}
    section.post-feedback
      p
        | 해당 포스트에 대해 궁금한 점이 있으면
        a(href="mailto:eks4116@gmail.com") eks4116@naver.com
        | 로 문의주세요.
</template>
<script>
export default {
	data(){
		return{
			defaultPost : {
				title: '',
				author: '',
				updatedDate: null,
				thumbnail: '',
				content: ''
			}
		}
	},
	 head() {
    const post = this.loadedPost
    return {
      title: post.title,
      meta: [
        { 
          hid: "description", 
          name: "description", 
          content: `${post.title} 포스트 페이지 입니다.`, // 보다 적절한 설명 필요
        }
      ]      
    }
  },
  computed: {
  loadedPost() {
   // 라우트 매개변수 id 값 (예: 'Nuxt.js 프레임워크')
      const id = this.$route.params.id
      // 스토어의 loadedPosts 배열에서 
      // 포스트 타이틀과 라우트 매개변수 id 값이 일치하는 
	  // 아이템을 찾아(find) 반환
	  return this.$store.getters.loadedPosts.find(post => post.title === id)
 	 }
  }
}
</script>
<style lang="sass" scoped>
	.page-single-post
		padding: 30px
		text-align: center
		box-sizing: border-box

	.post
		width: 100%

	.post-title
		margin: 0

	.post-info
		display: flex
		justify-content: center
		align-items: center
		flex-direction: column
		box-sizing: inherit
		border-bottom: 1px solid #ccc
		padding: 10px

	.post-data,
	.post-author
		margin: 0 10px
		color: #9a9a9a

	.post-feedback a
		padding:
			left: 5px
			right: 5px
		color: #46b784
		text-decoration: none
		transition: color 0.4s ease
		&:hover,
		&:active
			color: darken(#46b784, 20%)

	.post-image
		margin-top: 20px
		width: 100%
		height: auto

	.post-feedback
		width: 60%
		top: 30px
		right: auto
		left: auto
		border-top: 1px solid rgba(#000, 0.1)
		padding-top: 15px
		

	@media (min-width: 768px)
		.post
			width: 600px
			margin: auto
		
		.post-info
			flex-direction: row
</style>