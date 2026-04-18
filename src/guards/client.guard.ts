import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRole } from 'src/enums/user.enum';

@Injectable()
export class ClientGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('غير مصرح بك');
    }

    if (user.role !== UserRole.CLIENT && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'لا يمكن الوصول إلى هذا المورد إلا من قبل العملاء',
      );
    }

    return true;
  }
}
