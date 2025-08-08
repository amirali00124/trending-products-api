# Trending Products API

A simple Node.js + Express API that serves trending product data from a static JSON file. Deployed easily to Render.

## Endpoints

### `GET /trending`
Returns trending products. Supports query parameters:

- `category` — filter by category
- `platform` — filter by platform
- `min_score` — filter by minimum trend score
- `limit` — number of results to return

Example:
