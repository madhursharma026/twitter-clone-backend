import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  create(postDto: CreatePostDto, user: User) {
    const post = this.repo.create(postDto);
    post.user = user;
    return this.repo.save(post);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }
  

  findAll(): Promise<Post[]> {
    return this.repo.find();
  }

  // findAllPostOfSingleUser(userId: string) {
  //   const MyPosts = this.repo.find({
  //     where: { user: userId },
  //   });
  //   return MyPosts;
  // }

  findAllPostOfSingleUser(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.find({
         where: { user: id },
       });
  }
}



