import {
  Controller,
  Get,
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  GetRecipesByIngredientsService,
} from './services';
import {
  ResponseGetRecipesDto
} from './dtos';

@Controller('recipes')
export class RecipesController {

  constructor(
    private getRecipesByIngredientsService: GetRecipesByIngredientsService,
  ) { }

  /**
   * @api {get} /recipes Get recipes by ingredients
   * @apiName getRecipesByIngredients
   * @apiGroup Recipes
   * @apiParam {Array} i  Array os ingredients.
   * @apiParamExample {json} Request-Example:
   * http://localhost:8080/recipes/?i=onion,tomato
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200
   * {
   *  "keywords": ["onion", "tomato"],
   *  "recipes": [
   *    {
   *      "title": "Greek Omelet with Feta",
   *      "ingredients": ["eggs", "feta cheese", "garlic", "red onions", "spinach", "tomato", "water"],
   *      "link": "http://www.kraftfoods.com/kf/recipes/greek-omelet-feta-104508.aspx",
   *      "gif": "https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif"
   *    },
   *    {
   *      "title": "Guacamole Dip Recipe",
   *      "ingredients": ["avocado", "onions", "tomato"],
   *      "link":"http://cookeatshare.com/recipes/guacamole-dip-2783",
   *      "gif":"https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif"
   *    }
   *   ]
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": "Error to find gif in GIPHY",
   *  "error": "Bad Request"
   * }
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": "Error to find recipes in PUPPY",
   *  "error": "Bad Request"
   * }
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": "Error to find recipes",
   *  "error": "Bad Request"
   * }
   */
  @Get()
  async getRecipesByIngredients(
    @Query('i') ingredients: string
  ): Promise<ResponseGetRecipesDto> {
    try {
      return await this.getRecipesByIngredientsService.getRecipesByIngredients(ingredients);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}

