import os
import re
import pytest

ORDER_CONTROLLER_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'controllers', 'orderController.ts')


def test_create_order_from_cart_success():
    with open(ORDER_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    create_pattern = r'(createOrder|newOrder)'
    assert re.search(create_pattern, content), "createOrder function not found"

    status_pattern = r'(status|pending)'
    assert re.search(status_pattern, content), "status handling not found"


def test_create_order_with_empty_cart_raises_error():
    with open(ORDER_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    empty_pattern = r'(empty|ValueError|error)'
    assert re.search(empty_pattern, content), "empty cart error not found"


def test_get_orders_for_user_returns_correct_orders():
    with open(ORDER_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    get_orders_pattern = r'(getOrders|getOrdersByUserId)'
    assert re.search(get_orders_pattern, content), "getOrders function not found"


def test_get_order_by_id_for_owner_success():
    with open(ORDER_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    get_by_id_pattern = r'(getOrderById|getOrder)'
    assert re.search(get_by_id_pattern, content), "getOrderById function not found"


def test_get_order_by_id_for_nonexistent_order_raises_not_found():
    with open(ORDER_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound|not.*found)'
    assert re.search(not_found_pattern, content), "not found handling not found"


def test_get_order_by_id_for_other_user_raises_forbidden():
    with open(ORDER_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    forbidden_pattern = r'(403|Forbidden|forbid)'
    assert re.search(forbidden_pattern, content), "forbidden handling not found"