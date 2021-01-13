# Recipe API

Given a list of ingredients, return the recipes using those ingredients.

This api contains:

- Unit and integration tests;
- Based on clean architecture;
- [Documentation.](https://github.com/KelwinHenrique/CrawlerGetProductsML/blob/master/DOCS.md)
- Docker

## How to run the project with docker

1) Update .env with your environments variables;

2) Run in the root project `sudo docker-compose up` to initialize the container.

3) Run the comand bellow in your terminal:
```json
  curl -H "Content-Type: application/json" -X GET http://localhost:8080/recipes?i=tomato,apple
```
Or access [this url](https://github.com/KelwinHenrique/recipe-api/blob/main/DOCS.md) in your broswer.

## How to run tests

Run `npm run test` to execute all tests of the api.

## How to run documentation

1) Run `npm run docs` to create the documentation.

2) Enter the folder coverage/lcov-report and execute index.html

3) Or you can click [here](https://github.com/KelwinHenrique/recipe-api/blob/main/DOCS.md)

## Architecture

```bash
├── src
│   ├── api
│   │   ├── recipes
│   │   │   ├── services
│   │   │   │   ├── get-recipes-by-ingredients.service.ts
│   │   │   │   │── get-recipes-by-ingredients.spec.ts
│   │   │   │   │── index.ts
│   │   │   ├── dtos
│   │   │   │   ├── recipe.dto.ts
│   │   │   │   ├── response-data-puppy.dto.ts
│   │   │   │   ├── response-recipe-puppy.dto.ts
│   │   │   │   │── index.ts
│   │   │   ├── recipes.controller.ts
│   │   │   ├── recipes.module.ts
│   │   │   ├── recipes.repository.ts
│   │   ├── config
│   │   │   ├── config.module.ts
│   │   │   ├── config.service.ts
│   ├── app.module.ts
│   ├── main.ts
```

## Main Dependencies

- nestjs: Web framework.
- jest and supertest: Unit test and integration test.
- apiDoc and apidoc-markdown: To create documentation for this API.