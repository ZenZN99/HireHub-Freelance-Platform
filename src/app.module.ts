import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientProfileModule } from './modules/client-profile.module';
import { ContractModule } from './modules/contract.module';
import { FreelancerProfileModule } from './modules/freelancer-profile.module';
import { FreelancerProjectModule } from './modules/freelancer-project.module';
import { MessageModule } from './modules/message.module';
import { NotificationModule } from './modules/notification.module';
import { PaymentModule } from './modules/payment.module';
import { ProjectModule } from './modules/project.module';
import { ProposalModule } from './modules/proposal.module';
import { ProposalHelperModule } from './modules/proposal-helper.module';
import { UserModule } from './modules/user.module';
import { TokenModule } from './token/token.module';
import { ChatGateway } from './gateways/chat.gateway';
import { NotificationGateway } from './gateways/notification.gateway';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    ClientProfileModule,
    ContractModule,
    FreelancerProfileModule,
    FreelancerProjectModule,
    MessageModule,
    NotificationModule,
    PaymentModule,
    ProjectModule,
    ProposalHelperModule,
    ProposalModule,
    UserModule,
    TokenModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, NotificationGateway],
})
export class AppModule {}
