import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  /**
   * 通过网站 id 累加当前指向的网站访问数
   */
  const query = await readBody(event)
  return prisma.site.update({
    where: {
      id: query.id,
    },
    data: {
      visits_count: query.visits_count + 1,
    },
  })
})
