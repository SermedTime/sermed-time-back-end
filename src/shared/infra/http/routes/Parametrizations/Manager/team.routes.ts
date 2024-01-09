import { CreateTeamController } from '@modules/Parametrizations/Manager/Team/useCases/CreateTeam/CreateTeamController'
import { ListTeamController } from '@modules/Parametrizations/Manager/Team/useCases/ListTeam/ListTeamController'
import { UpdateTeamController } from '@modules/Parametrizations/Manager/Team/useCases/UpdateTeam/UpdateTeamController'
import { Router } from 'express'

const teamRoutes = Router()

const createTeamController = new CreateTeamController()
const updateTeamController = new UpdateTeamController()
const listTeamController = new ListTeamController()

teamRoutes.post('/', createTeamController.handle)
teamRoutes.put('/:uuid', updateTeamController.handle)
teamRoutes.get('/', listTeamController.handle)

export { teamRoutes }
