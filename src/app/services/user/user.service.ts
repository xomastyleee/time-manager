import {User} from '../../db/entities';
import {dataSource} from "../../../modules/common/hooks"
import {faker} from "@faker-js/faker"
import {UserStatus} from "@db/types/enams";
import {logger} from '@modules/common/utils'
import {In} from "typeorm";
import {IUserCreateUpdateParams} from "@db/types/interfaces";

export class UserService {
  private readonly Repository = dataSource.getRepository(User)
    public async createUserRandom() {
      try{
        const user = new User(
            faker.person.fullName(),
            UserStatus.Active,
            '');
        logger.info(`Creating user`, user)
        await this.Repository.save(user)
      }catch(error){
        logger.error('Error creating user',error);
      }

    }
    public async createUser(params: IUserCreateUpdateParams) {
      try{
        const { username, status, preferences } = params
        const user = new User(username, status, preferences)
        logger.info(`Creating user`, user)
        return this.Repository.save(user);
      }
      catch (error) {
        logger.error('Error creating user', error);
      }

    }
    public async getUserById(id: number) {
      try{
        return await this.Repository.findOneBy({
          id,
        })
      }catch(error){

      }
    }
    public async getUserByIds(ids: number[]) {
      try{
        return await this.Repository.find({
          where: {
            id: In(ids),
          },
        });
      }catch(error){

      }
    }
    public async updateUser(id:number, params: IUserCreateUpdateParams) {
      try{
        await this.Repository.update(id, params)
      }catch(error){

      }
    }
    public async getAllUsers() {
      try{
        return await this.Repository.find()
      }catch(error){
        logger.error('Error find users', error);
      }

    }
}
