import { z } from 'zod'

export const postSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(120, '제목은 120자 이하로 입력해주세요.')
    .refine((v) => v.trim().length > 0, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  tags: z.string(),
})

export type PostFormValues = z.infer<typeof postSchema>

export const storedPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const storedPostsSchema = z.array(storedPostSchema)
