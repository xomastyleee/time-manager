import { dataSource } from '@common/hooks'
import { logger } from '@common/utils'
import { In } from 'typeorm'
import { IUserCreateUpdateParams } from '@common/db/types/interfaces'
import { User } from '../entities'

export class UserService {
  private readonly userRepository = dataSource.getRepository(User)

  public async createUser(params: IUserCreateUpdateParams) {
    try {
      const user = new User(params)
      const result = await this.userRepository.save(user)
      logger.info('Creating user', result)
      return result
    } catch (error) {
      logger.error('Error creating user', error)
    }
  }

  public async getUserById(id: number) {
    try {
      const result = await this.userRepository.findOneBy({
        id
      })
      return result
    } catch (error) {
      logger.error('Error getting user', error)
    }
  }

  public async getUserByIds(ids: number[]) {
    try {
      const result = await this.userRepository.find({
        where: {
          id: In(ids)
        }
      })
      return result
    } catch (error) {
      logger.error('Error getting user', error)
    }
  }

  public async updateUser(id: number, params: IUserCreateUpdateParams) {
    try {
      const result = await this.userRepository.update(id, params)
      return result
    } catch (error) {
      logger.error('Error updating user', error)
    }
  }

  public async removeUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
      if (!user) {
        logger.error('Error:', new Error('User not found'))
        return
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
        logger.error('Error:', new Error('Users not found'))
        return
      }
      await this.userRepository.remove(users)
    } catch (error) {
      logger.error(`Error remove users ${ids}`, error)
    }
  }
}

export const userService = new UserService()
