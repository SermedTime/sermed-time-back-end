export default {
  secret_token: process.env.SECRET_TOKEN,
  expire_in_token: '4h',
  secret_token_recover_password: process.env.SECRET_TOKEN_RECOVER_PASSWORD,
  expitre_in_token_recover_password: '3h'
}
