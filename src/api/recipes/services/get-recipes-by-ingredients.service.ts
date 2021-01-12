import { Injectable } from '@nestjs/common';

@Injectable()
export class GetRecipesByIngredientsService {

  async getRecipesByIngredients(): Promise<any> {
    try {
      return {
        keyword: [],
        recipes: []
      };
    } catch (error) {
      return Promise.reject({ message: 'Error to find recipes'});
    }
  }
}