import { IResponseRepository } from 'services/Response/interfaces'

import { ICreateRegisterDTO } from '../dto/ICreateRegisterDTO'

interface ITimeSheet {
  Create(data: ICreateRegisterDTO): Promise<IResponseRepository>
}

export { ITimeSheet }
