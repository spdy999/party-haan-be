import * as fs from 'fs';
import * as Path from 'path';

import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { EntityDTO } from './test.dto';

/**
 * This class is used to support database
 * tests with unit tests in NestJS.
 *
 * This class is inspired by https://github.com/jgordor
 * https://github.com/nestjs/nest/issues/409#issuecomment-364639051
 */
@Injectable()
export class TestUtils {
  databaseService: DatabaseService;

  /**
   * Creates an instance of TestUtils
   */
  constructor(databaseService: DatabaseService) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
    }
    this.databaseService = databaseService;
  }

  /**
   * Shutdown the http server
   * and close database connections
   */
  // async shutdownServer(server: Http): Promise<void> {
  //   await server.httpServer.close();
  //   await this.closeDbConnection();
  // }

  /**
   * Closes the database connections
   */
  async closeDbConnection(): Promise<void> {
    const connection = this.databaseService.connection;
    if (connection.isConnected) {
      await connection.close();
    }
  }

  /**
   * Returns the order id
   * @param entityName The entity name of which you want to have the order from
   */
  // getOrder(entityName) {
  //   const order: string[] = JSON.parse(
  //     fs.readFileSync(
  //       Path.join(__dirname, '../test/fixtures/_order.json'),
  //       'utf8',
  //     ),
  //   );
  //   return order.indexOf(entityName);
  // }

  /**
   * Returns the entities of the database
   */
  getEntities(): EntityDTO[] {
    const connection = this.databaseService.connection;
    const entityMetadatas = connection.entityMetadatas;
    return entityMetadatas.map((entity) => ({
      name: entity.name,
      tableName: entity.tableName,
    }));
  }

  /**
   * Cleans the database and reloads the entries
   */
  async reloadFixtures(): Promise<void> {
    const entities = this.getEntities();
    await this.cleanAll(entities);
    await this.loadAll(entities);
  }

  /**
   * Cleans all the entities
   */
  async cleanAll(entities: EntityDTO[]): Promise<void> {
    try {
      for (const entity of entities) {
        const repository = await this.databaseService.getRepository(
          entity.name,
        );
        await repository.query(`DELETE FROM ${entity.tableName};`);
        // Reset IDs
        await repository.query(
          `DELETE FROM sqlite_sequence WHERE name='${entity.tableName}'`,
        );
      }
    } catch (error: any) {
      throw new Error(`ERROR: Cleaning test db: ${JSON.stringify(error)}`);
    }
  }

  /**
   * Insert the data from the src/test/fixtures folder
   */
  async loadAll(entities: EntityDTO[]): Promise<void> {
    try {
      for (const entity of entities) {
        const repository = await this.databaseService.getRepository(
          entity.name,
        );
        const fixtureFile = Path.join(
          __dirname,
          `../test/fixtures/${entity.name}.json`,
        );
        if (fs.existsSync(fixtureFile)) {
          const str = fs.readFileSync(fixtureFile, 'utf8');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const items = JSON.parse(str);
          await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(items)
            .execute();
        }
      }

      const puRepository = await this.databaseService.getRepository(
        'PartiesUsers',
      );
      await puRepository.query(
        'INSERT INTO parties_users (id, partyId, userId) VALUES (1, 2, 1)',
      );
      await puRepository.query(
        'INSERT INTO parties_users (id, partyId, userId) VALUES (2, 3, 1)',
      );
    } catch (error) {
      throw new Error(
        `ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${JSON.stringify(
          error,
        )}`,
      );
    }
  }
}
