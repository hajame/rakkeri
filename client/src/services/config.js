export const backendUrl = process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.length > 0 ?
  process.env.REACT_APP_BACKEND_URL
  :
  'https://ohtup-staging.cs.helsinki.fi/rakkeri_server';