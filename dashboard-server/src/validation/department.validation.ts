import { z } from 'zod';

export const selectionByDepartmentSchema = z.object({
  name: z.string(),
});

export const createDepartmentSchema = z.object({
  name: z.string(),
  companyId: z.string(),
  description: z.string(),
});

export const removeDepartmentSchema = z.string();
