import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable()
export class RecipesRepository {

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) { }

  findRecipesByIngredients(ingredients: string): Observable<any> {
    return this.httpService.get(`http://www.recipepuppy.com/api/?i=${ingredients}`);
  }

  findGifByTitle(title: string): Observable<any> {
    return this.httpService.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.configService.get('API_KEY_GIPHY')}=${title}&limit=1&offset=0&rating=g&lang=en`);
  }
}