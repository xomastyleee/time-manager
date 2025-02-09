import { In } from 'typeorm'
import { User } from '@common/db/entities'
import { logger } from '@common/utils'
import { IUserCreateParams, IUserUpdateParams, UserStatus } from '@common/types'
import { getUser } from '@common/services/transformers'
import { dataSource } from '@common/db/dataSource'

export class UserService {
  private readonly userRepository = dataSource.getRepository(User)

  public async createUser(params: IUserCreateParams) {
    try {
      const user = new User(params)
      const userEntity = await this.userRepository.save(user)
      const userResult = getUser(userEntity)
      logger.info('Creating user', userEntity)

      return userResult
    } catch (error) {
      logger.error('Error creating user', error)
    }
  }

  public async createUsers(usersData: IUserCreateParams[]) {
    try {
      const users = usersData.map((data) => new User(data))
      const usersEntities = await this.userRepository.save(users)
      const usersResults = usersEntities.map((user) => getUser(user))
      logger.info('Creating users', usersEntities)

      return usersResults
    } catch (error) {
      logger.error('Error creating users', error)
    }
  }

  public async getAllUsers() {
    const userAll = await this.userRepository.find()
    const userDto = userAll.map(getUser)
    return userDto
  }

  public async getActiveUser() {
    const userActive = await this.userRepository.findOneBy({
      status: UserStatus.Active
    })
    if (userActive) {
      return getUser(userActive)
    }
    return null
  }

  public async getUserById(id: number) {
    try {
      const userById = await this.userRepository.findOneBy({
        id
      })
      if (userById) {
        const userWithParsedPreferences = getUser(userById)
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
      return results.map(getUser)
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
