import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../../application/services/users.service';
import { CreateUserDto, ValidateUsersAdminFiltersPipeDto, ValidateUsersFiltersPipeDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { ValidateUsersFiltersPipe } from '../pipes/users.pipe';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ValidateUsersAdminFiltersPipe } from '../pipes/users-admin.pipe.';
import { ResponseBadRequestError, ResponseError500, ResponseUnauthorizedAndRoleDto } from '../../../../shared/dtos/responses.dto';
import { UserRoleEnum } from '../../../../shared/enum/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../../modules/auth/infraestructure/decorators/roles.decorator';
import { RolesGuard } from '../../../auth/presentation/guards/roles.guard';
import { ResponseCreateUsersDto, ResponseDeleteUserDto, ResponseDetailUsersDto, ResponseListAddressDto } from '../../application/dto/response-user.dto';
@ApiTags('Users')
@Controller('users')
@ApiResponse({
  type: ResponseBadRequestError,
  status: 400,
  description:
    'Errores relacionados a las validaciones de la información enviada al api',
})
@ApiResponse({
  type: ResponseError500,
  status: 500,
  description: 'Error inesperado en el servidor',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  @ApiOperation({ summary: 'Creación de un usuario con rol user'})
  @ApiResponse({
    type: ResponseCreateUsersDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = UserRoleEnum.USER;
    return this.usersService.create(createUserDto);
  }
  @Post('admin')
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR)
  @ApiOperation({ summary: 'Creación de un usuario con rol user'})
  @ApiResponse({
    type: ResponseCreateUsersDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  createAdmin(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = UserRoleEnum.ADMINISTRATOR;
    return this.usersService.create(createUserDto);
  }
  @Get()
  @ApiOperation({ summary: 'Listado de usuarios con rol user'})
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR)
  @ApiResponse({
    type: ResponseListAddressDto,
    status: 200,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  findAll(@Query(new ValidateUsersFiltersPipe()) query: ValidateUsersFiltersPipeDto) {
    return this.usersService.findAll(query);
  }
  @Get('admin')
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiResponse({
    type: ResponseListAddressDto,
    status: 200,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR)
  @ApiOperation({ summary: 'Listado de usuarios con rol user y administrador'})
  findAllAdmin(@Query(new ValidateUsersAdminFiltersPipe()) query: ValidateUsersAdminFiltersPipeDto) {
    return this.usersService.findAllAdmin(query);
  }
  @Get('detail/:id')
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiResponse({
    type: ResponseDetailUsersDto,
    status: 200,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR, UserRoleEnum.USER)
  @ApiOperation({ summary: 'Listado de usuarios con rol user y administrador'})
  @ApiOperation({ summary: 'Detalle de un usuario'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Put(':id')
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiResponse({
    type: ResponseDetailUsersDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR, UserRoleEnum.USER)
  @ApiOperation({ summary: 'Actualizar un usuario'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiResponse({
    type: ResponseDeleteUserDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR)
  @ApiOperation({ summary: 'Borrar un usuario'})
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
