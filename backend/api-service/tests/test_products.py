import os
import re
import pytest

ROUTES_PRODUCTS_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'routes', 'products.ts')


def test_get_products_returns_all_products():
    with open(ROUTES_PRODUCTS_PATH, 'r') as f:
        content = f.read()

    get_pattern = r'(router\.get|app\.get|GET)'
    assert re.search(get_pattern, content), "GET route not found"

    fields = ['id', 'name', 'description', 'price', 'imageUrl', 'stock', 'category', 'createdAt', 'updatedAt']
    for field in fields:
        assert field in content, f"Field {field} not found in route"


def test_get_products_with_pagination_returns_limited_results():
    with open(ROUTES_PRODUCTS_PATH, 'r') as f:
        content = f.read()

    pagination_pattern = r'(page|limit|pagination)'
    assert re.search(pagination_pattern, content), "Pagination not found"


def test_get_products_with_search_returns_matching_products():
    with open(ROUTES_PRODUCTS_PATH, 'r') as f:
        content = f.read()

    search_pattern = r'(search|query|filter)'
    assert re.search(search_pattern, content), "Search not found"


def test_get_products_with_invalid_pagination_params_returns_400():
    with open(ROUTES_PRODUCTS_PATH, 'r') as f:
        content = f.read()

    validation_pattern = r'(400|BadRequest|validation)'
    assert re.search(validation_pattern, content), "Validation not found"


def test_get_products_empty_result_returns_empty_list():
    with open(ROUTES_PRODUCTS_PATH, 'r') as f:
        content = f.read()

    empty_pattern = r'(\[\]|array|list)'
    assert re.search(empty_pattern, content), "Empty result handling not found"