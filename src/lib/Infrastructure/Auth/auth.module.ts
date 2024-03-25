// auth.module.ts
import { Logger, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [Logger, JwtService],
  exports: [JwtModule],
})
export class AuthModule {}
