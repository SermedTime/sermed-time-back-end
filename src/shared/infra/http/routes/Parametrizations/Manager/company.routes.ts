import { CreateCompanyController } from '@modules/Parametrizations/Manager/Company/useCases/CreateCompany/CreateCompanyController'
import { ListCompaniesController } from '@modules/Parametrizations/Manager/Company/useCases/ListCompanies/ListCompaniesController'
import { Router } from 'express'
import { container } from 'tsyringe'

const companyRoutes = Router()

const createCompanyController = container.resolve(CreateCompanyController)
const listCompaniesController = container.resolve(ListCompaniesController)

companyRoutes.post('/', createCompanyController.handle)
companyRoutes.get('/', listCompaniesController.handle)

export { companyRoutes }
