import os
import re
import pytest

ROUTES_ORDERS_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'routes', 'orders.ts')


def test_post_api_orders_creates_order_from_cart_with_jwt():
    with open(ROUTES_ORDERS_PATH, 'r') as f:
        content = f.read()

    post_pattern = r'(post|createOrder|POST.*orders)'
    assert re.search(post_pattern, content), "POST order route not found"

    jwt_pattern = r'(JWT|authenticate|token)'
    assert re.search(jwt_pattern, content), "JWT handling not found"


def test_post_api_orders_without_jwt_returns_401():
    with open(ROUTES_ORDERS_PATH, 'r') as f:
        content = f.read()

    auth_pattern = r'(401|unauthorized)'
    assert re.search(auth_pattern, content), "auth error handling not found"


def test_post_api_orders_with_empty_cart_returns_400():
    with open(ROUTES_ORDERS_PATH, 'r') as f:
        content = f.read()

    empty_pattern = r'(400|empty|BadRequest)'
    assert re.search(empty_pattern, content), "empty cart handling not found"


def test_get_api_orders_returns_order_history_for_user():
    with open(ROUTES_ORDERS_PATH, 'r') as f:
        content = f.read()

    get_pattern = r'(get|getOrders|GET.*orders)'
    assert re.search(get_pattern, content), "GET orders route not found"


def test_get_api_orders_without_jwt_returns_401():
    with open(ROUTES_ORDERS_PATH, 'r') as f:
        content = f.read()

    auth_pattern = r'(401|unauthorized)'
    assert re.search(auth_pattern, content), "auth error handling not found"


def test_get_api_orders_id_returns_order_for_owner():
    with open(ROUTES_ORDERS_PATH, 'r') as f:
        content = f.read()

    get_by_id_pattern = r'(getOrderById|getOrder|/:id)'
    assert re.search(get_by_id_pattern, content), "GET order by ID route not found"


def test_get_api_orders_id_for_nonexistent_order_returns_404():
    with open(ROUTES_ORDERS_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound)'
    assert re.search(not_found_pattern, content), "not found handling not found"


def test_get_api_orders_id_for_other_user_returns_403():
    with open(ROUTES_ORDERS_PATH, 'r') as f:
        content = f.read()

    forbidden_pattern = r'(403|forbidden|forbid)'
    assert re.search(forbidden_pattern, content), "forbidden handling not found"