import { CreateTeamController } from '@modules/Parametrizations/Manager/Team/useCases/CreateTeam/CreateTeamController'
import { UpdateTeamController } from '@modules/Parametrizations/Manager/Team/useCases/UpdateTeam/UpdateTeamController'
import { Router } from 'express'

const teamRoutes = Router()

const createTeamController = new CreateTeamController()
const updateTeamController = new UpdateTeamController()

teamRoutes.post('/', createTeamController.handle)
teamRoutes.put('/:uuid', updateTeamController.handle)

export { teamRoutes }
