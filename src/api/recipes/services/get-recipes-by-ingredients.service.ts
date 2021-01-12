import { Injectable } from '@nestjs/common';

@Injectable()
export class GetRecipesByIngredientsService {

  async getRecipesByIngredients(ingredients: string): Promise<any> {
    try {
      const arrayOfIgredients: string[] = this.transformIngredientsInArray(ingredients);
      return {
        keyword: arrayOfIgredients,
        recipes: []
      };
    } catch (error) {
      return Promise.reject({ message: 'Error to find recipes'});
    }
  }

  private transformIngredientsInArray(ingredients: string): string[] {
    return ingredients.split(',');
  }
}