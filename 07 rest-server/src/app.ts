import express from 'express'
import path from 'path'
import { Server } from './presentation/server'
import { AppRoutes } from './presentation/routes'



(
async () => {
    const server = new Server({port: 3000, router: AppRoutes.routes})
    await server.start()
})()