import { Test, TestingModule } from '@nestjs/testing';
import { Console } from 'console';
import { RecipesRepository } from '../recipes.repository';
import { GetRecipesByIngredientsService } from './index';

const mockRecipesRepository: any = () => ({
  findRecipesByIngredients: jest.fn(() => {
    return {
      data: {
        results: [
          {
            title: 'Recipe Title',
            href: 'recipe_url',
            ingredients: 'tomato onion apple'
          }
        ]
      }
    };
  }),
  findGifByTitle: jest.fn(() => {
    return {
      data: {
        data: [
          {
            url: 'gif_url',
          }
        ]
      }
    };
  }),
});

describe('GetRecipesByIngredientsService', () => {
  let recipesRepository: any;
  let getRecipesByIngredientsService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRecipesByIngredientsService,
        {
          provide: RecipesRepository,
          useFactory: mockRecipesRepository,
        },
      ],
    }).compile();

    recipesRepository = module.get<RecipesRepository>(RecipesRepository);
    getRecipesByIngredientsService = module.get<GetRecipesByIngredientsService>(GetRecipesByIngredientsService);
  });

  it('should be defined', () => {
    expect(getRecipesByIngredientsService).toBeDefined();
    expect(recipesRepository).toBeDefined();
  });

  it('should find recipes with ingredients onion and tomato', async () => {
    const response: any = await getRecipesByIngredientsService.getRecipesByIngredients('onion,tomato');
    expect(response.keywords).toContain('tomato');
    expect(response.keywords).toContain('onion');
    expect(response.recipes[0].title).toEqual('Recipe Title');
    expect(response.recipes[0].link).toEqual('recipe_url');
    expect(response.recipes[0].gif).toEqual('gif_url');
  });


  it('should return the ingredients in ascending order', async () => {
    const response: any = await getRecipesByIngredientsService.getRecipesByIngredients('onion,tomato');
    expect(response.recipes[0].ingredients[0]).toEqual('apple');
    expect(response.recipes[0].ingredients[1]).toEqual('onion');
    expect(response.recipes[0].ingredients[2]).toEqual('tomato');
  });

  it('should return error when findRecipesByIngredients goes wrong', async () => {
    const mockRecipesRepositoryError: any = () => ({
      findRecipesByIngredients: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
      findGifByTitle: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRecipesByIngredientsService,
        {
          provide: RecipesRepository,
          useFactory: mockRecipesRepositoryError,
        },
      ],
    }).compile();
    recipesRepository = module.get<RecipesRepository>(RecipesRepository);
    getRecipesByIngredientsService = module.get<GetRecipesByIngredientsService>(GetRecipesByIngredientsService);

    expect.assertions(1);
    try {
      await getRecipesByIngredientsService.getRecipesByIngredients('onion,tomato');
    } catch (error) {
      expect(error.message).toContain('Error to find recipes in PUPPY');
    }
  });

  it('should return error when findGifByTitle goes wrong', async () => {
    const mockRecipesRepositoryError: any = () => ({
      findRecipesByIngredients: jest.fn(() => {
        return {
          data: {
            results: [
              {
                title: 'Recipe Title',
                href: 'recipe_url',
                ingredients: 'tomato onion apple'
              }
            ]
          }
        };
      }),
      findGifByTitle: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRecipesByIngredientsService,
        {
          provide: RecipesRepository,
          useFactory: mockRecipesRepositoryError,
        },
      ],
    }).compile();
    recipesRepository = module.get<RecipesRepository>(RecipesRepository);
    getRecipesByIngredientsService = module.get<GetRecipesByIngredientsService>(GetRecipesByIngredientsService);

    expect.assertions(1);
    try {
      await getRecipesByIngredientsService.getRecipesByIngredients('onion,tomato');
    } catch (error) {
      expect(error.message).toContain('Error to find gif in GIPHY');
    }
  });

  it('should return error when service received a integer', async () => {
    try {
      await getRecipesByIngredientsService.getRecipesByIngredients(1);
    } catch (error) {
      expect(error.message).toContain('Error to find recipes');
    }
  });

  it('should return empty url gif when gif not found', async () => {
    const mockRecipesRepositoryError: any = () => ({
      findRecipesByIngredients: jest.fn(() => {
        return {
          data: {
            results: [
              {
                title: 'Recipe Title',
                href: 'recipe_url',
                ingredients: 'tomato onion apple'
              }
            ]
          }
        };
      }),
      findGifByTitle: jest.fn(() => {
        return {
          data: {
            data: undefined
          }
        };
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRecipesByIngredientsService,
        {
          provide: RecipesRepository,
          useFactory: mockRecipesRepositoryError,
        },
      ],
    }).compile();
    recipesRepository = module.get<RecipesRepository>(RecipesRepository);
    getRecipesByIngredientsService = module.get<GetRecipesByIngredientsService>(GetRecipesByIngredientsService);

    const response: any = await getRecipesByIngredientsService.getRecipesByIngredients('onion,tomato');
    expect(response.recipes[0].gif).toEqual('');
  });
});
