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
      const API_KEY = process.env.APIKey // API 키 필요
      // 로그인 상태(isLogin)에 따라 Firebase에 요청하는 Endpoint 경로를 변경
      // 가입 인증일 경우(비 로그인): signupNewUser
      // 로그인 인증일 경우: verifyPassword
      const authURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${
      !this.isLogin ? 'signupNewUser' : 'verifyPassword'
      }?key=${API_KEY}`


      this.$axios.$post(authURL,
        {
          email: this.email,
          password: this.password,
          returnSecureToken: true
        }
      )
      .then(result => console.log(result))
      .catch(e => console.error(e))
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