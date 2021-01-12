import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RecipesRepository {

  constructor(private httpService: HttpService) { }

  findRecipesByIngredients(ingredients: string): Observable<any> {
    return this.httpService.get(`http://www.recipepuppy.com/api/?i=${ingredients}`);
  }
}