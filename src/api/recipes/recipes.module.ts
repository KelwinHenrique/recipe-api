import { Module, HttpModule } from '@nestjs/common';
import { GetRecipesByIngredientsService } from './services';
import { RecipesController } from './recipes.controller';
import { RecipesRepository } from './recipes.repository';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [RecipesController],
  providers: [
    GetRecipesByIngredientsService,
    RecipesRepository,
  ],
})
export class RecipesModule { }
