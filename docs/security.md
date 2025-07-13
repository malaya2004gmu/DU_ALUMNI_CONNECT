# 🔐 Security Implementation

- Passwords: Hashed with bcrypt
- Auth: JWT tokens stored in HTTP-only cookies
- Messages: Encrypted using OpenPGP (AES + RSA hybrid)
- Rate Limiting: Express middleware
- Input Validation: express-validator

## Encryption Flow
1. Sender fetches receiver’s public key
2. AES key is generated and message encrypted
3. AES key is encrypted with RSA
4. Both are sent securely to receiver
