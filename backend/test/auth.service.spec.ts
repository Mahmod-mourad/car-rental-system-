import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user as any);

      const result = await service.validateUser('test@example.com', 'password123');
      expect(result).toBeDefined();
    });

    it('should return null if user not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password123');
      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user as any);

      const result = await service.validateUser('test@example.com', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token on successful login', () => {
      const user = { id: '1', email: 'test@example.com', role: 'admin' };
      jest.spyOn(jwtService, 'sign').mockReturnValue('token123');

      const result = service.login(user as any);

      expect(result).toEqual({ access_token: 'token123' });
      expect(jwtService.sign).toHaveBeenCalled();
    });
  });
});
