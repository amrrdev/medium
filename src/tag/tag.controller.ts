import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagEntity } from './entities/tag.entity';
import { TagDto } from './dto/tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAll();
    return { tags: tags.map((tag) => tag.name) };
  }

  @Post()
  async createTag(@Body() tagDto: TagDto): Promise<TagEntity> {
    return await this.tagService.create(tagDto);
  }
}
