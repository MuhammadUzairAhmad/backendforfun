import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserRolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log("Roles guard is running");

    // Extract the user from the request
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming that the user is attached to the request during authentication

    // Check if user has the 'user' role
    if (user && user.usertype === 'user') {
      return true; // Allow access for user
    }

    // Throw an UnauthorizedException for other user types
    throw new UnauthorizedException('Unauthorized access Only User can access');
  }
}
