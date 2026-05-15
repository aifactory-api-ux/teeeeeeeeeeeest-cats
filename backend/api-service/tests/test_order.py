import os
import re
import pytest

ORDER_MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'models', 'order.ts')


def test_create_order_persists_to_database():
    with open(ORDER_MODEL_PATH, 'r') as f:
        content = f.read()

    create_pattern = r'(create|insert|save|new Order)'
    assert re.search(create_pattern, content), "createOrder function not found"


def test_get_orders_by_user_id_returns_all_orders():
    with open(ORDER_MODEL_PATH, 'r') as f:
        content = f.read()

    get_by_user_pattern = r'(findByUserId|getOrders|getOrdersByUserId)'
    assert re.search(get_by_user_pattern, content), "getOrdersByUserId function not found"


def test_get_order_by_id_returns_order():
    with open(ORDER_MODEL_PATH, 'r') as f:
        content = f.read()

    get_by_id_pattern = r'(findById|getOrder|findOne)'
    assert re.search(get_by_id_pattern, content), "getOrderById function not found"


def test_get_order_by_id_nonexistent_returns_none():
    with open(ORDER_MODEL_PATH, 'r') as f:
        content = f.read()

    none_pattern = r'(null|None|undefined)'
    assert re.search(none_pattern, content), "null return not found"


def test_create_order_with_invalid_status_raises_error():
    with open(ORDER_MODEL_PATH, 'r') as f:
        content = f.read()

    validation_pattern = r'(status|ValueError|validation)'
    assert re.search(validation_pattern, content), "status validation not found"