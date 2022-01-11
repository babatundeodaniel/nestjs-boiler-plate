import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EventPattern } from "@nestjs/microservices";
import { TestEvent } from "src/events/test.event";
import { TestService } from "src/test/test.service";

@Injectable()
export class TestEventListener {
  constructor(
    private testService: TestService,
  ) {}

  @OnEvent('test.successful')
  @EventPattern('test_created')
  handlePaymentSuccessfulEvent(payload: TestEvent) {
    // handle and process "OrderCreatedEvent" event
    const test = payload.test;
    // Settle payment
    // Credit fees
    // Update settlement

    console.log('event lister called');
  }

}