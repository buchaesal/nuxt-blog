const logger = ({ req }) => {
    const isServer = process.server
    console.log(isServer ? '서버에서 로그' : '클라이언트에서 로그')
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    console.log(userAgent)
  }
  
  export default logger