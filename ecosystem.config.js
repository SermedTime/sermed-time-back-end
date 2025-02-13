module.exports = {
  apps: [
    {
      name: 'app-dev',
      script:
        '/home/bilgiadmin/applications/desenvolvimento/api/dist/shared/infra/http/server.js',
      watch: true,
      instances: 1,
      autorestart: true,
      node_args: '--insecure-http-parser',
      env: {
        WEB_APP_URL: 'time.sermedsaude.com.br',
        ENVIRONMENT: 'development',
        DB_USER: 'app_sermed',
        DB_PWD: '@pp_s3rm3d',
        DB_NAME: 'SERMED_TIME',
        DB_HOST: '10.10.11.139',
        DB_PORT: '11433',
        DB_SAGE_USER: 'sa',
        DB_SAGE_PWD: 'S@geBr.2014',
        DB_SAGE_NAME: 'Sage_Gestao_Contabil',
        DB_SAGE_HOST: '10.10.11.38',
        DB_SAGE_PORT: '1434',
        SECRET_TOKEN: '9280bd757682951adb652313dc00f87f1aa94b16',
        SECRET_TOKEN_RECOVER_PASSWORD:
          'e2a6147a05fc9e652d073df274de52d825d244b6',
        CRYPTO_KEY: '2e35f242a46d67eeb74aabc37d5e5d05',
        SENDGRID_API_KEY:
          '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',
        MAIL_PROVIDER: 'sendgrid',
        FROM_MAIL: 'tainan.pino@bilgi.com.br',
        USER_ACTION: '6890F4B8-8700-43CA-A205-E880833F5988',
        PORT: '3000'
      }
    },
    {
      name: 'app-hom',
      script:
        '/home/bilgiadmin/applications/homologacao/api/dist/shared/infra/http/server.js',
      watch: true,
      instances: 1,
      autorestart: true,
      node_args: '--insecure-http-parser',
      env: {
        WEB_APP_URL: 'homolog.sermedsaude.com.br',
        ENVIRONMENT: 'homologacao',
        DB_USER: 'app_sermed',
        DB_PWD: '@pp_s3rm3d',
        DB_NAME: 'SERMED_TIME',
        DB_HOST: '10.10.11.139',
        DB_PORT: '11434',
        DB_SAGE_USER: 'sa',
        DB_SAGE_PWD: 'S@geBr.2014',
        DB_SAGE_NAME: 'Sage_Gestao_Contabil',
        DB_SAGE_HOST: '10.10.11.38',
        DB_SAGE_PORT: '1434',
        SECRET_TOKEN: '9280bd757682951adb652313dc00f87f1aa94b16',
        SECRET_TOKEN_RECOVER_PASSWORD:
          'e2a6147a05fc9e652d073df274de52d825d244b6',
        CRYPTO_KEY: '2e35f242a46d67eeb74aabc37d5e5d05',
        SENDGRID_API_KEY:
          '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',
        MAIL_PROVIDER: 'sendgrid',
        FROM_MAIL: 'tainan.pino@bilgi.com.br',
        USER_ACTION: '6890F4B8-8700-43CA-A205-E880833F5988',
        PORT: '3001'
      }
    },
    {
      name: 'app-prd',
      script: '/home/bilgiadmin/applications/producao/api/server.js',
      watch: true,
      instances: 'max', // Usa o máximo de instâncias possíveis
      exec_mode: 'cluster', // Ativa o modo de cluster para produção
      autorestart: true,
      node_args: '--insecure-http-parser',
      env: {
        WEB_APP_URL: 'http://localhost:3001',
        DB_USER: 'app_sermed',
        DB_PWD: 'app_sermed',
        DB_NAME: 'SERMED_TIME',
        DB_HOST: '192.168.0.103',
        DB_SAGE_USER: 'sa',
        DB_SAGE_PWD: 'S@geBr.2014',
        DB_SAGE_NAME: 'Sage_Gestao_Contabil',
        DB_SAGE_HOST: '10.10.11.38',
        DB_SAGE_PORT: '1434',
        SECRET_TOKEN: '9280bd757682951adb652313dc00f87f1aa94b16',
        SECRET_TOKEN_RECOVER_PASSWORD:
          'e2a6147a05fc9e652d073df274de52d825d244b6',
        CRYPTO_KEY: '2e35f242a46d67eeb74aabc37d5e5d05',
        SENDGRID_API_KEY:
          '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',
        MAIL_PROVIDER: 'sendgrid',
        FROM_MAIL: 'tainan.pino@bilgi.com.br',
        PORT: '3002'
      }
    }
  ]
}
