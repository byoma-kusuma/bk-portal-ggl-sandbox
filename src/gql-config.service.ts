import { GraphqlConfig } from './common/configs/config.interface';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}
  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>('graphql');
    return {
      // schema options
      autoSchemaFile: true,
      // autoSchemaFile: false, // join(process.cwd(), 'src/schema.graphql'),
      // sortSchema: true, //graphqlConfig.sortSchema,
      // buildSchemaOptions: {
      //   numberScalarMode: 'integer',
      // },
      // subscription
      installSubscriptionHandlers: true,
      debug: graphqlConfig.debug,
      playground: true,
      context: ({ req }) => ({ req }),
      useGlobalPrefix: true,
    };
  }
}
