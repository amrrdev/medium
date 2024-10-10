import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TagEntity } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  async create(tagDto: TagDto): Promise<TagEntity> {
    const tag = this.tagRepository.create(tagDto);
    return await this.tagRepository.save(tag);
  }

  async delete(id: number) {
    await this.tagRepository.delete(id);
  }
}
