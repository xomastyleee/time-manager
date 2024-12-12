import { dataSource } from '@common/hooks'
import { logger } from '@common/utils'
import { In } from 'typeorm'
import { IUserCreateUpdateParams } from '@common/db/types/interfaces'
import { User } from '../../entities'

export class UserService {
  private readonly userRepository = dataSource.getRepository(User)

  public async createUser(params: IUserCreateUpdateParams) {
    try {
      const { username, status, preferences } = params
      const user = new User(username, status, preferences)
      logger.info('Creating user', user)
      return await this.userRepository.save(user)
    } catch (error) {
      logger.error('Error creating user', error)
    }
  }

  public async getUserById(id: number) {
    try {
      return await this.userRepository.findOneBy({
        id
      })
    } catch (error) {
      logger.error('Error getting user', error)
    }
  }

  public async getUserByIds(ids: number[]) {
    try {
      return await this.userRepository.find({
        where: {
          id: In(ids)
        }
      })
    } catch (error) {
      logger.error('Error getting user', error)
    }
  }

  public async updateUser(id: number, params: IUserCreateUpdateParams) {
    try {
      await this.userRepository.update(id, params)
    } catch (error) {
      logger.error('Error updating user', error)
    }
  }

  public async removeUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
      if (!user) {
        throw new Error('User not found')
      }
      await this.userRepository.remove(user)
    } catch (error) {
      logger.error(`Error remove user ${id}`, error)
    }
  }

  public async removeUserByIds(ids: number[]) {
    try {
      const users = await this.userRepository.find({ where: { id: In(ids) } })
      if (!users) {
        throw new Error('Users not found')
      }
      await this.userRepository.remove(users)
    } catch (error) {
      logger.error(`Error remove users ${ids}`, error)
    }
  }
}
