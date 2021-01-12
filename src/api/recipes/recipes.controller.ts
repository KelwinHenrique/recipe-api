import {
  Controller,
  Get,
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  GetRecipesByIngredientsService,
} from './services';

@Controller('recipes')
export class RecipesController {

  constructor(
    private getRecipesByIngredientsService: GetRecipesByIngredientsService,
  ) { }

  @Get()
  async getRecipesByIngredients(
    @Query('i') ingredients: string
  ): Promise<any> {
    try {
      return await this.getRecipesByIngredientsService.getRecipesByIngredients(ingredients);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}

