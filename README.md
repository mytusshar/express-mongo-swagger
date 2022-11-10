# ScoreCredits REST API

An API built with Express and MongoDB. Documented with Swagger.

## API Usage

#### Get all scorecredits

```http
  GET /scorecredits
```

| Optional Parameter | Type  | Description                                        | Example   |
| :----------------- | :---- | :------------------------------------------------- | :-------- |
| `page`             | `int` | Page number. Default: 1                            | ?page=2   |
| `limit`            | `int` | Limit number of scorecredits per page. Default: 10 | ?limit=20 |

#### Get scorecredits

```http
  GET /scorecredits/:id
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `string` | **Required**. Id of scorecredits to fetch |

#### Add scorecredits

```http
  POST /scorecredits
```

```json
{
	"score": 10,
	"credits": 150
}
```

#### Update scorecredits

```http
  PUT /scorecredits/:id
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `id`      | `string` | **Required**. Id of scorecredits to update |

```json
{
	"score": 10,
	"credits": 150
}

// All fields are optional when updating
```

#### Remove scorecredits

```http
  DELETE /scorecredits/:id
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `id`      | `string` | **Required**. Id of scorecredits to delete |
