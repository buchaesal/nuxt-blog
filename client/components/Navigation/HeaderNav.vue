<template>
<header class="page-header" ref="pageHeader">
  <h1 class="page-brand">
    <nuxt-link to="/">BLOG</nuxt-link>
  </h1>
  <div class="spacer"></div>
    <button class="button nav-side-toggle" 
    type="button" 
    aria-label="메뉴 토글 버튼"
    @click="$emit('onNavMenuToggle')"><span class="bar" v-for="bar in bars" :key="bar"></span></button>
    <nav class="page-nav">
      <ul class="page-nav-list">
        <li class="page-nav-item" v-for="(link, index) in navLinks" :key="index">
          <nuxt-link :to="link.route">{{ link.text }}</nuxt-link>
        </li>
        <li class="page-nav-item" v-show="isAdmin"><a href="#" @click="logout">로그아웃</a></li>
      </ul>
    </nav>
</header>
</template>
<script>
export default {
  props: {
    navLinks: {
      type: Array,
      default: () => {
        return []
      }
    },
    isAdmin:{
      type: Boolean
    }
  },
   mounted() {
     console.log(this.isAdmin)
    // 마운트 된 시점에서 함수 실행
    this.header = this.$refs.pageHeader;
    this.headerTop = this.header.offsetTop;
     window.addEventListener('scroll', this.detectWindowScrollY);
  },
  beforeDestroy() {
    // 컴포넌트 파괴 이전 시점에 함수 실행
    window.removeEventListener('scroll', this.detectWindowScrollY);
  },
  data() {
    return {
      bars: [1, 2, 3],
      scrolled: false,
      header: null,
      headerTop: 0
    }
  },
  methods: {
    detectWindowScrollY() {
      // 감지 이벤트 메서드
      this.scrolled = window.scrollY > this.headerTop ? true : false;
      const header = this.header;
      this.scrolled
        ? header.classList.add('scrolled')
        : header.classList.remove('scrolled')
    },
     logout(){
      this.$store.state.token = null
      this.$router.push('/')
    }
  }
}
</script>
<style lang="sass" scoped>
@import "~assets/styles/config"

.page-header
  display: flex
  justify-content: space-around
  align-items: center
  position: fixed
  z-index: 100
  top: 60px
  left: 50%
  transform: translateX(-50%)
  width: 87vw
  height: 60px
  border-radius: 3px
  border: 1px solid rgba(#fff, 0.1)
  padding: 0 10px
  background-color: rgba(#fff, 0.2)
  backdrop-filter: blur(4px)
    transition: all 0.4s ease-out
  &.scrolled
    top: 0
    left: 0
    width: 100vw
    transform: none
    border-radius: 0
    background-color: rgba(darken($point-color, 30%), 0.55)
    backdrop-filter: blur(2px)

.page-brand
  margin: 0 10px
  font-size: 1.7rem
  font-family: Changa, Sans-Serif
  a
    text-decoration: none
    letter-spacing: 0.23em
    color: #fff

.spacer
    flex: 1

// 모바일 내비게이션 토글 버튼
.button.nav-side-toggle
  cursor: pointer
  order: 1
  display: flex
  flex-direction: column
  justify-content: space-evenly
  padding: 8px 12px
  height: 80%
  border: 1px solid rgba(#fff, 0.3)
  transition: all 0.4s ease
  background: none
  .bar
    display: inline-block
    width: 24px
    height: 3px
    background-color: rgba(#fff, 0.6)
    transition: all 0.4s ease
  &:hover, &:focus
    border-color: #fff
    .bar
      background-color: #fff

@media (min-width: 768px)
  .button.nav-side-toggle
    display: none

// 페이지 내비게이션
.page-nav
  display: none

.page-nav-list
  display: flex
  margin: 0
  padding: 0
  list-style: none

.page-nav-item
  margin: 0 10px
  a
    text-decoration: none
    color: #fff
    border-bottom: 2px solid transparent
    transition: all 0.4s ease
    &:hover,
    &:active,
    &.nuxt-link-active
      border-bottom-color: #fff

@media (min-width: 768px)
  .page-nav
    display: block
</style>