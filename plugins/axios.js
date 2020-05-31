// import https from 'https'
// import axios from 'axios'

// export default function ({ $axios, store }) {
//   const agent = new https.Agent({
//     rejectUnauthorized: false
//   })

//   $axios.onRequest((config) => {
//     if (process.env.NODE_ENV !== 'production') {
//       config.httpsAgent = agent
//     }
//   })
// }