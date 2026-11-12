import { AuthMiddleware } from './auth.middleware.js';
import * as jwt from 'jsonwebtoken';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware()).toBeDefined();
  });

  it('accepts a bearer token in the authorization header', () => {
    const middleware = new AuthMiddleware();
    const token = jwt.sign({ userId: 'user-123' }, 'key', { expiresIn: '1h' });
    const request = {
      headers: { authorization: `Bearer ${token}` },
    } as never;
    const next = vi.fn();

    middleware.use(request, {} as never, next);

    expect(next).toHaveBeenCalledOnce();
    expect(request).toHaveProperty('userId', 'user-123');
  });

  it('accepts a raw token in the auth-user header', () => {
    const middleware = new AuthMiddleware();
    const token = jwt.sign({ userId: 'user-123' }, 'key', { expiresIn: '1h' });
    const request = {
      headers: { 'auth-user': token },
    } as never;
    const next = vi.fn();

    middleware.use(request, {} as never, next);

    expect(next).toHaveBeenCalledOnce();
  });
});
