import { Router, Request, Response } from 'express'

const timeSheetRoutes = Router()

timeSheetRoutes.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.query

    return res.json({ message: `Hello ${name}` })
  }
)

export { timeSheetRoutes }
