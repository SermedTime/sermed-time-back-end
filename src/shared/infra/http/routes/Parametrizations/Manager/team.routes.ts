import { Router } from 'express'

import { CreateTeamController } from '@modules/Parametrizations/Manager/Team/useCases/CreateTeam/CreateTeamController'
import { UpdateTeamController } from '@modules/Parametrizations/Manager/Team/useCases/UpdateTeam/UpdateTeamController'
import { ListTeamController } from '@modules/Parametrizations/Manager/Team/useCases/ListTeam/ListTeamController'
import { DetailsTeamController } from '@modules/Parametrizations/Manager/Team/useCases/DetailsTeam/DetailsTeamController'

const teamRoutes = Router()

const createTeamController = new CreateTeamController()
const updateTeamController = new UpdateTeamController()
const listTeamController = new ListTeamController()
const detailsTeamController = new DetailsTeamController()

teamRoutes.post('/', createTeamController.handle)
teamRoutes.put('/:uuid', updateTeamController.handle)
teamRoutes.get('/', listTeamController.handle)
teamRoutes.get('/:uuid', detailsTeamController.handle)

export { teamRoutes }
