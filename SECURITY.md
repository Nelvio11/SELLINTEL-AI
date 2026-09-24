# Segurança — produção

Nunca pedir ou guardar:
- PIN bancário;
- password bancária;
- OTP/2FA;
- CVV;
- chaves privadas;
- códigos de recuperação.

Antes de produção:
- HTTPS;
- banco gerido;
- cookies HttpOnly/Secure/SameSite ou IdP;
- rate limiting;
- verificação de email;
- recuperação de conta;
- CSRF/CSP e headers;
- backups;
- gestão de segredos;
- validação de webhooks;
- logs sem dados sensíveis;
- controlo de acesso;
- política de privacidade e termos.
