import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '../recipes.repository';
import {
  ResponseDataPuppyDto,
  ResponseRecipePuppyDto,
  RecipeDto,
  ResponseGetRecipesDto,
} from '../dtos';

@Injectable()
export class GetRecipesByIngredientsService {

  constructor(private readonly recipesRepository: RecipesRepository) {
  }

  private transformStringOfIngredientsInArray(ingredients: string, separator: string): string[] {
    return ingredients.split(separator);
  }

  private async findGifByTitle(title: string): Promise<string> {
    try {
      const responseData: any = (await this.recipesRepository.findGifByTitle(title).toPromise()).data.data;
      return responseData && responseData[0] ? responseData[0].url : '';
    } catch (error) {
      return Promise.reject({ message: 'Error to find gif in GIPHY'});
    }
  }

  private async serializeRecipe(recipe: ResponseRecipePuppyDto): Promise<RecipeDto> {
    const { title, href, ingredients } = recipe;
    const arrayOfIngredients: string[] = this.transformStringOfIngredientsInArray(ingredients, ' ');
    return {
      title,
      link: href,
      ingredients: arrayOfIngredients.sort(),
      gif: await this.findGifByTitle(title),
    };
  }

  private async serializeResponse(responseListOfRecipesPuppy: ResponseRecipePuppyDto[]): Promise<RecipeDto[]> {
    const recipes: RecipeDto[] = [];
    for (const recipePuppy of responseListOfRecipesPuppy) {
      const recipe: RecipeDto = await this.serializeRecipe(recipePuppy);
      recipes.push(recipe);
    }
    return recipes;
  }

  private async findRecipesInPuppy(ingredients: string): Promise<ResponseDataPuppyDto> {
    try {
      const responseData: ResponseDataPuppyDto = (await this.recipesRepository.findRecipesByIngredients(ingredients).toPromise()).data;
      return responseData;
    } catch (error) {
      return Promise.reject({ message: 'Error to find recipes in PUPPY'});
    }
  }

  async getRecipesByIngredients(ingredients: string): Promise<ResponseGetRecipesDto> {
    try {
      const responseData: ResponseDataPuppyDto = await this.findRecipesInPuppy(ingredients);
      const serializedRecipes: any = await this.serializeResponse(responseData.results);
      const arrayOfIngredients: string[] = this.transformStringOfIngredientsInArray(ingredients, ',');
      return {
        keywords: arrayOfIngredients,
        recipes: serializedRecipes,
      };
    } catch (error) {
      return Promise.reject({ message: error.message || 'Error to find recipes'});
    }
  }
}