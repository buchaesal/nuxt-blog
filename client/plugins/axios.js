import https from 'https'

export default function ({$axios}) {

    $axios.onRequest(config => {
      config.httpsAgent = new https.Agent({
        rejectUnauthorized: false
      });
    })
  
  }