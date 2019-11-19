export default function ({ store, redirect, error }) {
    // auth 확인
    if (!store.state.token) {
      return redirect('/admin/auth')
    }
  }