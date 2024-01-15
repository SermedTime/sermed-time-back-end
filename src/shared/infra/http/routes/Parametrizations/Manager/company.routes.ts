import { Router } from 'express'
import { container } from 'tsyringe'

import { CreateCompanyController } from '@modules/Parametrizations/Manager/Company/useCases/CreateCompany/CreateCompanyController'
import { ListCompaniesController } from '@modules/Parametrizations/Manager/Company/useCases/ListCompanies/ListCompaniesController'
import { DetailsCompanyController } from '@modules/Parametrizations/Manager/Company/useCases/DetailsCompany/DetailsCompanyController'

const companyRoutes = Router()

const createCompanyController = container.resolve(CreateCompanyController)
const listCompaniesController = container.resolve(ListCompaniesController)
const detailsCompanyController = container.resolve(DetailsCompanyController)

companyRoutes.post('/', createCompanyController.handle)
companyRoutes.get('/', listCompaniesController.handle)
companyRoutes.get('/:uuid', detailsCompanyController.handle)

export { companyRoutes }
