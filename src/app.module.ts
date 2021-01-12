import { Module } from '@nestjs/common';
import { RecipeModule } from './api/recipes/recipe.module';

@Module({
  imports: [RecipeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
