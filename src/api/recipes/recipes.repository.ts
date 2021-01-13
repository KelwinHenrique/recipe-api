import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable()
export class RecipesRepository {

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) { }

  async findRecipesByIngredients(ingredients: string): Promise<any> {
    return ((await this.httpService.get(`http://www.recipepuppy.com/api/?i=${ingredients}`).toPromise()));
  }

  async findGifByTitle(title: string): Promise<any> {
    return (await this.httpService
      .get(`https://api.giphy.com/v1/gifs/search?api_key=${this.configService.get('API_KEY_GIPHY')}=${title}&limit=1&offset=0&rating=g&lang=en`)
      .toPromise());
  }
}