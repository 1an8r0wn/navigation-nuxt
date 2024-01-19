import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  return prisma.category.findMany({
    where: {
      visibility: true,
      delete_flag: false,
    },
  })
})
