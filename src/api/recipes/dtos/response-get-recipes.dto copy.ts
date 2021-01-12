import { RecipeDto } from './recipe.dto';

class ResponseGetRecipesDto {
  keywords: string[];
  recipes: RecipeDto[];
}

export { ResponseGetRecipesDto };