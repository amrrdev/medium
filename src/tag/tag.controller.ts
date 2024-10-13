import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagEntity } from './entities/tag.entity';
import { TagDto } from './dto/tag.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(@ActiveUser() activeUserData: ActiveUserData): Promise<{ tags: string[] }> {
    console.log(activeUserData.email);
    const tags = await this.tagService.findAll();
    return { tags: tags.map((tag) => tag.name) };
  }

  @Post()
  async createTag(@Body() tagDto: TagDto): Promise<TagEntity> {
    return await this.tagService.create(tagDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.tagService.delete(id);
  }
}
