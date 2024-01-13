import {PrismaClient} from '@prisma/client'

/**
 * @name service-status-check
 * @path server\api\service-status-check.ts
 * @description 服务状态检查
 * @author: Edward-Brock
 * @date: 2024/1/13 14:12
 * @update: 2024/1/13 14:12
 *
 * 判断 option 表中的 service_status 字段进行反馈
 * 0 - 暂停；
 * 1 - 运行；
 */

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    // 定义状态代码、服务状态及返回消息
    let code: number = 403
    let status: string = 'pause'
    let msg: string = '暂停服务'

    // 通过 Prisma 向 option 表中查找 system_status 字段
    const serviceStatusOption = await prisma.option.findUniqueOrThrow({
      where: {name: 'service_status'},
    })

    // 通过 option_value 字段进行判断当前服务状态
    switch (serviceStatusOption.value) {
      case '1':
        code = 200
        status = 'run'
        msg = '正在运行'
        break
    }

    return {
      code,
      status,
      msg,
      date: new Date().toLocaleString(),
    }
  } catch (error) {
    console.error('[ERROR GETTING SERVICE STATUS OPTION]', error)
  } finally {
    await prisma.$disconnect()
  }
})
