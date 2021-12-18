import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';

@Public()
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPermissions(): Promise<Permission[]> {
    return this.permissionService.all();
  }

  @Post()
  async createPermission(@Body('name') name: string): Promise<Permission> {
    return this.permissionService.create({ name });
  }

  @Put('/:id')
  async updatePermission(
    @Param('id') permissionId: number,
    @Body('name') name: string,
  ): Promise<any> {
    return this.permissionService.update(permissionId, { name });
  }

  @Delete('/:id')
  async deletePermission(@Param('id') permissionId): Promise<any> {
    return this.permissionService.delete(permissionId);
  }
}
