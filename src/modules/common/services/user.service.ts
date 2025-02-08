import { In } from 'typeorm'
import { User } from '@common/db/entities'
import { dataSource } from '@common/hooks'
import { logger } from '@common/utils'
import { IUserCreateParams, IUserUpdateParams, UserStatus } from '@common/types'

export class UserService {
  private readonly userRepository = dataSource.getRepository(User)

  public async createUser(params: IUserCreateParams) {
    try {
      const user = new User(params)
      const result = await this.userRepository.save(user)

      logger.info('Creating user', result)

      return result
    } catch (error) {
      logger.error('Error creating user', error)
    }
  }

  public async getAllUsers() {
    return this.userRepository.find()
  }

  public async getActiveUser() {
    return this.userRepository.findOneBy({
      status: UserStatus.Active
    })
  }

  public async getUserById(id: number) {
    try {
      const userById = await this.userRepository.findOneBy({
        id
      })
      if (userById) {
        const userWithParsedPreferences = { ...userById, preferences: JSON.parse(userById?.preferences) }
        return userWithParsedPreferences
      }
      return userById
    } catch (error) {
      logger.error('Error getting user', error)
    }
  }

  public async getUserByIds(ids: number[]) {
    try {
      const results = await this.userRepository.find({
        where: {
          id: In(ids)
        }
      })
      return results.map((user) => ({ ...user, preferences: JSON.parse(user?.preferences) }))
    } catch (error) {
      logger.error('Error getting user', error)
    }
  }

  public async updateUser(id: number, params: IUserUpdateParams) {
    try {
      if (params.preferences) {
        const result = await this.userRepository.update(id, {
          ...params,
          preferences: JSON.stringify(params.preferences)
        })

        return result
      }
      const { preferences, ...updatedParams } = params

      const result = await this.userRepository.update(id, updatedParams)
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
