import { SetMetadata } from '@nestjs/common';

export const Permissions = (feature: string, permission: string) =>
  SetMetadata('permissions', { feature, permission });
