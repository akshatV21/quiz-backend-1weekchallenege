import { BadRequestException, Injectable } from '@nestjs/common'
import { PracticeResultRepository, SetRepository, UserRepository } from 'src/database/repositories'
import { PracticeDto } from './dtos/practice.dto'
import { AuthUserDocument } from 'src/utils/interfaces'
import { Types } from 'mongoose'
import { PracticeResultManager } from './result-manager.service'

@Injectable()
export class PracticeService {
  constructor(
    private readonly SetRepository: SetRepository,
    private readonly UserRepository: UserRepository,
    private readonly PracticeResultManager: PracticeResultManager,
    private readonly PracticeResultRepository: PracticeResultRepository,
  ) {}

  async create({ setId }: PracticeDto, user: AuthUserDocument) {
    const setExists = await this.SetRepository.exists({ _id: setId })
    if (!setExists) throw new BadRequestException('Set does not exist.')

    const resultObjectId = new Types.ObjectId()
    const transaction = await this.PracticeResultRepository.startTransaction()

    try {
      const updateUserPromise = this.UserRepository.update(user._id, { $push: { 'results.practice': resultObjectId } })
      const createResultPromise = this.PracticeResultRepository.create({ user: user._id, set: setId }, resultObjectId)

      const [result] = await Promise.all([createResultPromise, updateUserPromise])
      await transaction.commitTransaction()

      this.PracticeResultManager.register(user.id, result.id)
      return result
    } catch (error) {
      await transaction.abortTransaction()
      throw error
    }
  }
}
