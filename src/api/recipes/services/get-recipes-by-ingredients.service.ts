import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '../recipes.repository';
import {
  ResponseDataDto,
  ResponseListOfRecipesDto
} from '../dtos';

@Injectable()
export class GetRecipesByIngredientsService {

  constructor(private readonly recipesRepository: RecipesRepository) {
  }

  async getRecipesByIngredients(ingredients: string): Promise<any> {
    try {
      const responseData: ResponseDataDto = await this.findRecipesInPuppy(ingredients);
      const arrayOfIgredients: string[] = this.transformStringOfIngredientsInArray(ingredients, ',');
      const serializedRecipes: any = await this.serializeResponse(responseData.results);
      return {
        keywords: arrayOfIgredients,
        recipes: serializedRecipes,
      };
    } catch (error) {
      return Promise.reject({ message: error.message || 'Error to find recipes'});
    }
  }

  private async findRecipesInPuppy(ingredients: string): Promise<ResponseDataDto> {
    try {
      const responseData: ResponseDataDto = (await this.recipesRepository.findRecipesByIngredients(ingredients).toPromise()).data;
      return responseData;
    } catch (error) {
      return Promise.reject({ message: 'Error to find recipes in PUPPY'});
    }
  }

  private async serializeResponse(responseListOfRecipes: ResponseListOfRecipesDto[]): Promise<any> {
    const response = [];
    for (const responseListOfRecipe of responseListOfRecipes) {
      const recipe: ResponseListOfRecipesDto = await this.serializeRecipe(responseListOfRecipe);
      response.push(recipe);
    }
    return response;
  }

  private async serializeRecipe(recipe: ResponseListOfRecipesDto): Promise<any> {
    const { title, href, ingredients } = recipe;
    const arrayOfIngredients: string[] = this.transformStringOfIngredientsInArray(ingredients, ' ');
    return {
      title,
      link: href,
      ingredients: arrayOfIngredients.sort(),
      gif: await this.findGifByTitle(title),
    };
  }

  private async findGifByTitle(title: string): Promise<any> {
    try {
      const responseData: any = (await this.recipesRepository.findGifByTitle(title).toPromise()).data.data;
      return responseData && responseData[0] ? responseData[0].url : '';
    } catch (error) {
      return Promise.reject({ message: 'Error to find gif in GIPHY'});
    }
  }

  private transformStringOfIngredientsInArray(ingredients: string, separator: string): string[] {
    return ingredients.split(separator);
  }
}