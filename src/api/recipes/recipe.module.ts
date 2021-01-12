import { Module, HttpModule } from '@nestjs/common';
import { GetRecipesByIngredientsService } from './services';
import { RecipesController } from './recipes.controller';
import { RecipesRepository } from './recipes.repository';

@Module({
  imports: [HttpModule],
  controllers: [RecipesController],
  providers: [
    GetRecipesByIngredientsService,
    RecipesRepository,
  ],
})
export class RecipeModule { }
