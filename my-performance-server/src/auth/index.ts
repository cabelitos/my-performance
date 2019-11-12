import jwksRsa from 'jwks-rsa';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';

const client = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: process.env.AUTH0_JWKS_URI || '',
});

const jwtOptions = {
  algorithms: ['RS256'],
  issuer: process.env.AUTH0_ISSUER,
  audience: process.env.AUTH0_AUDIENCE,
};

export default {
  getUserIdFromToken: (tokenWithPrefix: string | null): Promise<string> => {
    if (!tokenWithPrefix) {
      throw new Error('Authorization is null');
    }
    const token = tokenWithPrefix.split(' ')[1];
    return new Promise((resolve, reject): void => {
      const getKey = (
        { kid }: JwtHeader,
        callback: SigningKeyCallback,
      ): void => {
        client.getSigningKey(
          kid,
          (
            err: Error | null,
            key: { publicKey?: string; rsaPublicKey?: string },
          ): void => {
            if (err) {
              callback(err, null);
              return;
            }
            callback(null, key.publicKey || key.rsaPublicKey);
          },
        );
      };
      jwt.verify(
        token,
        getKey,
        jwtOptions,
        (err: Error | null, decoded: { sub?: string } | string) => {
          if (err) {
            reject(err);
            return;
          }
          if (typeof decoded === 'string') {
            reject(new Error('Wrong token format'));
            return;
          }
          if (!decoded.sub) {
            reject(new Error('Token has no sub property'));
            return;
          }
          resolve(decoded.sub);
        },
      );
    });
  },
};
