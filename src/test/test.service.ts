import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';
import { Observable } from 'rxjs';

@Injectable()
export class TestService extends AbstractService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepo: Repository<Test>,
    @Inject('TEST_SERVICE') private client: ClientProxy,
  ) {
    super(testRepo);
  }

  async accumulate() {
    const pattern = 'notifications';
    const payload = [1, 2, 3];
    // let result;
    try {
      const result = await this.client.send(pattern, payload);
        result.subscribe(
          value =>  { console.log(value)},
          // error => console.log('error', error)
        );
        return result;
    } catch (err) {
      console.log('error', err);
    }

    
  }
}
