import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SignupDto } from 'src/dtos/user/signup.dto';
import { UserService } from 'src/services/user.service';
import type { Response } from 'express';
import { LoginDto } from 'src/dtos/user/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import type { RequestWithUser } from 'src/types/express';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserRole, VerificationStatus } from 'src/enums/user.enum';

@Controller('/api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() data: SignupDto, @Res({ passthrough: true }) res: Response) {
    return this.userService.signup(data, res);
  }

  @Post('login')
  login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.userService.login(data, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.userService.logout(res);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: RequestWithUser) {
    return this.userService.me(req.user._id);
  }

  @Put('update/avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  updateAvatar(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateAvatar(req.user, file);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  getAllUsers(
    @Req() req: RequestWithUser,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.userService.getAllUsers(
      req.user._id,
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Delete('user/:id')
  @UseGuards(AuthGuard, AdminGuard)
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @Put('update/role/:userId')
  @UseGuards(AuthGuard, AdminGuard)
  updateUserRole(
    @Req() req: RequestWithUser,
    @Param('userId') userId: string,
    @Body() role: UserRole,
  ) {
    return this.userService.updateUserRole(req.user, userId, role);
  }

  @Post('verify-identity')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idCard', maxCount: 1 },
      { name: 'selfie', maxCount: 1 },
    ]),
  )
  uploadIdentity(
    @Req() req: RequestWithUser,
    @UploadedFiles()
    files: { idCard?: Express.Multer.File[]; selfie?: Express.Multer.File[] },
  ) {
    return this.userService.uploadIdentity(req.user, files);
  }

  @Get('verification-requests')
  @UseGuards(AuthGuard)
  getVerificationRequests(@Req() req: RequestWithUser) {
    return this.userService.getVerificationRequests(req.user);
  }

  @Patch('verify/:userId')
  @UseGuards(AuthGuard)
  verifyUser(
    @Req() req: RequestWithUser,
    @Param('userId') userId: string,
    @Body('status') status: VerificationStatus,
  ) {
    return this.userService.verifyUser(req.user, userId, status);
  }
}
