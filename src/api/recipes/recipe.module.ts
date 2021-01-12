import { Module } from '@nestjs/common';
import { GetRecipesByIngredientsService } from './services';
import { RecipesController } from './recipes.controller';

@Module({
  controllers: [RecipesController],
  providers: [
    GetRecipesByIngredientsService
  ],
})
export class RecipeModule { }
