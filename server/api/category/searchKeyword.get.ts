import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  /**
   * 关键字包含在 category 内的 name 或 description 中
   * 同时返回 category 内的所有 site
   */
  const categoryData = await prisma.category.findMany({
    where: {
      OR: [
        { name: { contains: query.keyword } },
        { description: { contains: query.keyword } },
      ],
      AND: {
        is_visibility: true,
        is_delete: false,
      },
    },
    include: {
      site: true,
    },
  })

  /**
   * 关键字包含在 site 内的 name 或 description 中
   * 同时返回所属 category 的信息
   */
  const siteData = await prisma.category.findMany({
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
          OR: [
            { name: { contains: query.keyword } },
            { description: { contains: query.keyword } },
          ],
          AND: {
            is_visibility: true,
            is_delete: false,
          },
        },
        orderBy: {
          is_sensitive: 'asc',
        },
      },
    },
  })

  // 对 category 和 site 共同存在的值进行过滤，防止同一数据产生两次
  const filteredSiteData = siteData
    .map(category => ({
      ...category,
      site: category.site.filter((site: {
        id: any
      }) => !categoryData.some(category => category.id === category.id && category.site.some((s: {
        id: any
      }) => s.id === site.id))),
    }))
    .filter(category => category.site.length > 0)

  return [...categoryData, ...filteredSiteData]
})
