# DenpaRadio API Documentation

## Endpoints :

List of available endpoints:

- `GET /`
- `GET /playlist`
- `GET /meta`
- `POST /newMeta`

&nbsp;

## 1. GET /

Description:
- Retrieve an array of videos
- Request a new batch of videos from YouTube Data API if the Video table in database is empty or the latest VideoMeta has the property currentVideoIndex >= 49

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "videoId": "string"
    },
    ...
]
```

&nbsp;

## 2. GET /playlist

Description:
- Send a request to YouTube Data API and recceive its response
- Only for testing purposes

_Response (200 - OK)_

```json
{
    "items": {
        "kind": "string",
        "etag": "string",
        "nextPageToken": "string",
        "items": [
            {
                "kind": "string",
                "etag": "string",
                "id": "string",
                "contentDetails": {
                    "videoId": "string",
                    "videoPublishedAt": "date"
                }
            },
            ...
        ],
        "pageInfo": {
            "totalResults": "integer",
            "resultsPerPage": "integer"
        }
    }
}
```

&nbsp;

## 3. GET /meta

Description:
- Retrieve the latest VideoMeta data

_Response (200 - OK)_

```json
{
    "id": "integer",
    "nextPageToken": "string",
    "currentPage": "integer",
    "currentVideoPlayTime": "date",
    "currentVideoIndex": "integer"
}
```

&nbsp;

## 4. POST /newMeta

Description:
- Add a new VideoMeta data to the database

Request:

- body: 

```json
{
  "currentVideoPlayTime": "string",
  "currentVideoIndex": "integer"
}
```

_Response (201 - OK)_

```json
{
    "id": "integer",
    "nextPageToken": "string",
    "currentPage": "integer",
    "currentVideoPlayTime": "date",
    "currentVideoIndex": "integer"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```