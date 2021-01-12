import { Module } from '@nestjs/common';
import { RecipesModule } from './api/recipes/recipes.module';

@Module({
  imports: [RecipesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
