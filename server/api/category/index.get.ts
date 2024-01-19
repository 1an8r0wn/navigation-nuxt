import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  return prisma.category.findMany({
    where: {
      is_visibility: true,
      is_delete: false,
    },
    orderBy: {
      sort: 'desc',
    },
  })
})
