import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>)
    {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    console.log(CreateUserDto);
    try{
      const {password, ...userdata} = CreateUserDto;
      const newUser = new this.userModel({
        password: bcrypt.hashSync(password, 10),
        ...userdata
      });
      await newUser.save();
      const {password:_, ...user} = newUser.toJSON();
      return user;
      
    }catch(e){
      if (e.code === 11000){
        throw new BadRequestException(`${CreateUserDto.email} already exists`);
      }
      throw new InternalServerErrorException('Internal server error');
    }


  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
