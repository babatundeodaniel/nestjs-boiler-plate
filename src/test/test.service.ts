import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { timeout } from 'rxjs';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService extends AbstractService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepo: Repository<Test>,
    @Inject('TEST_SERVICE') private client: ClientProxy,
  ) {
    super(testRepo);
  }


  /**
   * Sends message to the microservice
   * @param message 
   * @returns 
   */
  async accumulate(message?: any) {
    const pattern = message || 'notifications';
    const payload = [1, 2, 3];
    // let result;
    try {
      const result = await this.client
      .send(pattern, payload)
      .pipe(timeout(10000))
      .toPromise();
        // result.subscribe(
        //   value =>  { console.log(value)},
        //   // error => console.log('error', error)
        // );
        return result;
    } catch (err) {
      console.log('error', err);
    }

    
  }

}
