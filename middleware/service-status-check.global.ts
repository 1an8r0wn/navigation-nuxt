/**
 * @name service-status-check.global
 * @path middleware\service-status-check.global.ts
 * @description 【全局中间件】服务状态检查
 * @author: Edward-Brock
 * @date: 2024/1/13 14:20
 * @update: 2024/1/13 14:20
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const serviceStatusCheck = await useFetch('/api/service-status-check')

  // 判断当前服务状态代码及状态是否正常运行，若 code 不为 200 且 status 不为 run 则判定服务状态异常
  if (serviceStatusCheck.data.value?.code !== 200 && serviceStatusCheck.data.value?.status !== 'run')
    return setPageLayout('pause-service')
})
