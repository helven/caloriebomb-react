// Typescript file
import { authServices } from '@/services/api/auth/';
import { coreServices } from '@/services/api/core/';
import { foodServices } from '@/services/api/food/';

export const api = {
  auth: authServices,
  core: coreServices,
  food: foodServices,
}