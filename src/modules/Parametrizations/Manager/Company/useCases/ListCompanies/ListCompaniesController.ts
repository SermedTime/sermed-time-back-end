import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCompaniesUseCase } from './ListCompaniesUseCase'

class ListCompaniesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { search, searchingBy, records, status, order, page } = req.query

    const listCompaniesUseCase = container.resolve(ListCompaniesUseCase)

    const companies = await listCompaniesUseCase.execute({
      search: search as string,
      searchingBy: searchingBy as string,
      records: Number(records),
      status: status as string,
      order: order as string,
      page: Number(page)
    })

    return res.status(companies.status).json(companies)
  }
}

export { ListCompaniesController }
