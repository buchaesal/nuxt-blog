<template lang="pug">
.page-admin-auth.container
  form.auth-form(@submit.prevent="onSubmit")
    ui-input(
      type="email",
      uniqueId="email"
      v-model="email") 이메일 주소
    ui-input(
      type="password",
      uniqueId="password"
      v-model="password") 비밀번호
    .button-group(role="group")
      ui-button(style="margin-right: 10px")
        | {{ isLogin ? '로그인' : '회원가입' }}
      ui-button(
        type="button",
        styles="inverted",
        @click="isLogin = !isLogin"
      )
        | {{ '"' + (isLogin ? '회원가입' : '로그인') + '" 폼으로 변경' }}
</template>

<script>
import UiInput from '@/components/UI/UiInput'
import UiButton from '@/components/UI/UiButton'

export default {
  layout: 'admin',
  components: { UiInput, UiButton },
  data() {
    return {
      isLogin: true,
      email: '',
      password: ''
    }
  },
   methods: {
    onSubmit() {
    // 스토어에 authUser 액션을 실행시키도록 알림
    // 로그인 상태, 로그인 정보(이메일, 패스워드)를 페이로드로 전달
    this.$store
      .dispatch('authUser', {
        isLogin: this.isLogin,
        email: this.email,
        password: this.password
      })
      // 인증이 완료되면 로그인 성공을 알림 창으로 표시한 후,
      // 관리자 메인 페이지로 이동
      .then(() => {
        this.$notify({
          group: 'admin-noti',
          title: '로그인 성공!',
          type: 'success',
          text: '사용자 로그인에 성공했습니다.',
          duration: 2000,
          speed: 400
        })
        setTimeout(() => {
          this.$router.push('/admin')
        }, 1000)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.auth-form
  width: 80%
  margin:
    left: auto
    right: auto

.button-group
  margin-top: 30px
</style>