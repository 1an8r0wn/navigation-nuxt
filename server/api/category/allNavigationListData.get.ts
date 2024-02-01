import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  /**
   * 通过 Prisma 嵌套搜索 category 和 site 数据表
   * 过滤 is_visibility 为 false 且 is_delete 为 true 的数据
   */
  return prisma.category.findMany({
    where: {
      is_visibility: true,
      is_delete: false,
    },
    orderBy: {
      sort: 'asc',
    },
    include: {
      site: {
        where: {
          is_visibility: true,
          is_delete: false,
        },
        orderBy: {
          is_sensitive: 'asc',
        },
      },
    },
  })
})
