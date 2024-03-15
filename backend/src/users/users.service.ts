import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>;

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
    this.seedDemoUsers();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('البريد الإلكتروني مستخدم بالفعل');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'name', 'email', 'phone', 'role', 'permissions', 'status', 'avatar', 'lastLogin', 'createdAt'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.usersRepository.update(id, { lastLogin: new Date() });
  }

  private async seedDemoUsers() {
    const count = await this.usersRepository.count();
    if (count > 0) return;

    const demoUsers = [
      {
        name: 'أحمد محمد العلي',
        email: 'admin@carshowroom.sa',
        phone: '+966501234567',
        password: await bcrypt.hash('123456', 10),
        role: UserRole.ADMIN,
        permissions: ['users', 'cars', 'customers', 'sales', 'rentals', 'services', 'reports', 'settings'],
        avatar: '/placeholder.svg?height=40&width=40&text=أم',
      },
      {
        name: 'سارة أحمد الخالد',
        email: 'sales@carshowroom.sa',
        phone: '+966509876543',
        password: await bcrypt.hash('123456', 10),
        role: UserRole.SALES_MANAGER,
        permissions: ['cars', 'customers', 'sales'],
        avatar: '/placeholder.svg?height=40&width=40&text=س',
      },
      {
        name: 'محمد عبدالله السعد',
        email: 'rental@carshowroom.sa',
        phone: '+966512345678',
        password: await bcrypt.hash('123456', 10),
        role: UserRole.RENTAL_MANAGER,
        permissions: ['cars', 'customers', 'rentals'],
        avatar: '/placeholder.svg?height=40&width=40&text=م',
      },
      {
        name: 'فاطمة علي الزهراني',
        email: 'service@carshowroom.sa',
        phone: '+966587654321',
        password: await bcrypt.hash('123456', 10),
        role: UserRole.SERVICE_MANAGER,
        permissions: ['services', 'customers'],
        avatar: '/placeholder.svg?height=40&width=40&text=ف',
      },
      {
        name: 'خالد أحمد المطيري',
        email: 'accountant@carshowroom.sa',
        phone: '+966556789012',
        password: await bcrypt.hash('123456', 10),
        role: UserRole.ACCOUNTANT,
        permissions: ['reports', 'sales', 'rentals'],
        avatar: '/placeholder.svg?height=40&width=40&text=خ',
      },
    ];

    await this.usersRepository.save(demoUsers);
    console.log('✅ Demo users created successfully');
  }
}
