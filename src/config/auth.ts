export default {
  secret_token: process.env.SECRET_TOKEN,
  expire_in_token: '30m',
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  expire_in_refresh_token: '30d',
  expires_refresh_token_days: 30
}
