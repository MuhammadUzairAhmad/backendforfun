import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminRolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log("Roles guard is running");

    // Extract the user from the request
    const user = context.switchToHttp().getRequest().user;
    // const user = request.user; // Assuming that the user is attached to the request during authentication
    console.log("ujhgjkhgkjser",user)

    // Check if user has the 'admin' role
    if (user && user.usertype === 'admin') {
      return true; // Allow access for admin
    }

    // Throw an UnauthorizedException for other user types
    throw new UnauthorizedException('Unauthorized access Only Admin can access');
  }
}
