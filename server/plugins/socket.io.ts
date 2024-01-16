import * as os from 'node:os'
import type { Socket } from 'socket.io'
import { Server } from 'socket.io'
import type { DefaultEventsMap } from 'socket.io/dist/typed-events'
import type { Ref, UnwrapRef } from 'vue'
import { ref } from 'vue'

export default defineNitroPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const port = runtimeConfig.public.socketPort || 3001
  const io = new Server(Number(port), {
    serveClient: false,
    cors: {
      origin: '*',
    },
  })

  const onlineUserCount = ref(0)

  io.engine.on('connection_error', (err) => {
    return {
      code: 500,
      message: `[SOCKET CONNECTION ERROR]: ${err}`,
    }
  })

  io.on('connection', (socket) => {
    // 增加 SOCKET 在线人数
    onlineUserCount.value++
    socket.emit('message', `WELCOME ${socket.id}`)
  })

  io.on('connect', (socket) => {
    socket.on('error', (msg) => {
      return {
        code: 500,
        message: `[SOCKET ERROR]: ${msg}`,
      }
    })

    socket.broadcast.emit('message', `${socket.id} JOINED`)

    getHardwareInfo(socket, onlineUserCount)

    socket.on('disconnecting', () => {
      // 削减 SOCKET 在线人数
      onlineUserCount.value--
      socket.broadcast.emit('message', `${socket.id} LEFT`)
    })
  })

  /**
   * 获取 CPU 当前使用情况
   */
  function getCurrentCpuUsage(): number {
    const cpus = os.cpus()
    const totalIdle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0)
    const totalTick = cpus.reduce((acc, cpu) => {
      for (const type in cpu.times)
        acc[type] = (acc[type] || 0) + cpu.times[type]

      return acc
    }, {} as { [key: string]: number })

    const totalUsed = totalTick.user + totalTick.nice + totalTick.sys
    const total = totalUsed + totalIdle

    return (totalUsed / total) * 100
  }

  /**
   * 获取内存当前使用情况
   */
  function getCurrentMemoryUsage() {
    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()
    const usedMemory = totalMemory - freeMemory

    return {
      totalMemoryGB: (totalMemory / (1024 * 1024 * 1024)).toFixed(2), // 转换为兆字节
      usedMemoryGB: (usedMemory / (1024 * 1024 * 1024)).toFixed(2), // 转换为兆字节
      freeMemoryGB: (freeMemory / (1024 * 1024 * 1024)).toFixed(2), // 转换为兆字节
    }
  }

  /**
   * 获取当前时间
   */
  function getCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
  }

  /**
   * 获取硬件相关信息
   * @param socket
   * @param onlineUserCount
   */
  function getHardwareInfo(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, onlineUserCount: Ref<UnwrapRef<number>>) {
    // 监听用户发送的事件
    socket.on('_emitSystemInfo', () => {
      // 定时发送内存使用率给所有连接的客户端
      setInterval(() => {
        const cpuUsage = getCurrentCpuUsage()
        const memoryUsage = getCurrentMemoryUsage()
        const currentTime = getCurrentTime()
        socket.emit('_listenSystem', [{
          name: 'CPU 使用率',
          value: `${cpuUsage.toFixed(2)}%`,
        }, {
          name: '已用内存',
          value: `${memoryUsage.usedMemoryGB} GB`,
        }, {
          name: '在线人数',
          value: `${onlineUserCount.value}`,
        }, {
          name: '当前时间',
          value: currentTime,
        }])
      }, 1000)
    })
  }
})
