<template>
  <div>
    <!-- pages/index.vue 파일에서 해당 영역 코드 이동 -->
    <section class="intro"></section>
    <!-- 내비게이션 컴포넌트 -->
    <header-nav
      :nav-links="navLinks"
      @onNavMenuToggle="toggleMenu"/>
    <header-nav-menu
      :nav-links="navLinks"
      :display="displayMenu"
      @onClose="closeMenu"/>
    <nuxt/>
  </div>
</template>
<script>
// 컴포넌트 불러오기
import HeaderNav from '@/components/Navigation/HeaderNav'
import HeaderNavMenu from '@/components/Navigation/HeaderNavMenu'

export default {
  // 컴포넌트 등록
  components: { HeaderNav, HeaderNavMenu },
  // 컴포넌트에 전달한 데이터 정의
  data() {
    return {
      // 모바일 메뉴 화면 표시 상태
      displayMenu: false,
      // 메뉴 아이템
      navLinks: [
        { route: '/posts', text: '블로그' },
        { route: '/about', text: '서비스 소개' },
        { route: '/admin', text: '관리자' }
      ]
    }
  },
  // 컴포넌트의 커스텀 이벤트 수신 시, 처리 메서드 정의
  methods: {
    // 메뉴 토글
    toggleMenu() {
      this.displayMenu = !this.displayMenu
    },
    // 메뉴 닫기
    closeMenu() {
      this.displayMenu = false
    }
  }
}
</script>
<style lang="sass" scoped>
@import "~assets/styles/config"

.intro
  position: relative
  height: 200px
  margin-bottom: 20px
  padding: 30px
  background: darken($color, 40%) url("~assets/images/intro-bg.jpg") center
  background-size: cover
</style>
