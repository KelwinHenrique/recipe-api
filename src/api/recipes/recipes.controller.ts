import {
  Controller,
  Get,
  BadRequestException,
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
  async getRecipesByIngredients(): Promise<any> {
    try {
      return await this.getRecipesByIngredientsService.getRecipesByIngredients();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}

