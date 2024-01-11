import { CreateCompanyController } from '@modules/Parametrizations/Manager/Company/useCases/CreateCompany/CreateCompanyController'
import { Router } from 'express'
import { container } from 'tsyringe'

const companyRoutes = Router()

const createCompanyController = container.resolve(CreateCompanyController)

companyRoutes.post('/', createCompanyController.handle)

export { companyRoutes }
