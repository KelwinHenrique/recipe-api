<a name="top"></a>
# Recipe API v1.0.5

apiDoc Recipe

 - [Recipes](#Recipes)
   - [Get recipes by ingredients](#Get-recipes-by-ingredients)

___


# <a name='Recipes'></a> Recipes

## <a name='Get-recipes-by-ingredients'></a> Get recipes by ingredients
[Back to top](#top)

```
GET /recipes
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| i | `Array` | <p>Array os ingredients.</p> |

### Parameters examples
`json` - Request-Example:

```json
http://localhost:8080/recipes/?i=onion,tomato
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200
{
 "keywords": ["onion", "tomato"],
 "recipes": [
   {
     "title": "Greek Omelet with Feta",
     "ingredients": ["eggs", "feta cheese", "garlic", "red onions", "spinach", "tomato", "water"],
     "link": "http://www.kraftfoods.com/kf/recipes/greek-omelet-feta-104508.aspx",
     "gif": "https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif"
   },
   {
     "title": "Guacamole Dip Recipe",
     "ingredients": ["avocado", "onions", "tomato"],
     "link":"http://cookeatshare.com/recipes/guacamole-dip-2783",
     "gif":"https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif"
   }
  ]
}
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": "Error to find gif in GIPHY",
 "error": "Bad Request"
}
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": "Error to find recipes in PUPPY",
 "error": "Bad Request"
}
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": "Error to find recipes",
 "error": "Bad Request"
}
```
