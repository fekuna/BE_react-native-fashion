import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getRoles(): Promise<Role[]> {
    return await this.roleService.all(['permissions']);
  }

  @Get('/:id')
  async getRoleById(@Param('id') id: number) {
    return await this.roleService.findOne({ id }, ['permissions']);
  }

  @Post()
  async createRole(
    @Body('name') name: string,
    @Body('permissions') ids?: number[],
  ): Promise<Role> {
    return await this.roleService.create({
      name,
      permissions: ids?.map((id) => ({ id })),
    });
  }

  @Put('/:id')
  async updateRole(
    @Param('id') id: number,
    @Body('name') name?: string,
    @Body('permissions') ids?: number[],
  ) {
    if (name) await this.roleService.update(id, { name });

    const role = await this.roleService.findOne({ id });
    console.log('hehe', role);

    return this.roleService.create({
      ...role,
      permissions: ids?.map((id) => ({ id })),
    });
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
