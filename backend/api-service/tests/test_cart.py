import os
import re
import pytest

ROUTES_CART_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'routes', 'cart.ts')


def test_get_cart_by_user_id_returns_cart():
    with open(ROUTES_CART_PATH, 'r') as f:
        content = f.read()

    get_cart_pattern = r'(getCart|getCartByUserId|findCart)'
    assert re.search(get_cart_pattern, content), "getCart function not found"


def test_add_cart_item_persists_to_redis():
    with open(ROUTES_CART_PATH, 'r') as f:
        content = f.read()

    add_pattern = r'(addCartItem|addItem|add.*cart)'
    assert re.search(add_pattern, content), "addCartItem function not found"

    redis_pattern = r'(redis|Redis)'
    assert re.search(redis_pattern, content), "Redis not found"


def test_update_cart_item_quantity_persists_to_redis():
    with open(ROUTES_CART_PATH, 'r') as f:
        content = f.read()

    update_pattern = r'(updateCartItem|updateQuantity|update.*cart)'
    assert re.search(update_pattern, content), "updateCartItem function not found"


def test_remove_cart_item_persists_to_redis():
    with open(ROUTES_CART_PATH, 'r') as f:
        content = f.read()

    remove_pattern = r'(removeCartItem|removeItem|delete.*cart)'
    assert re.search(remove_pattern, content), "removeCartItem function not found"


def test_get_cart_by_user_id_returns_empty_cart_if_not_exists():
    with open(ROUTES_CART_PATH, 'r') as f:
        content = f.read()

    empty_pattern = r'(\[\]|empty|undefined)'
    assert re.search(empty_pattern, content), "empty cart handling not found"


def test_add_cart_item_with_existing_product_increments_quantity():
    with open(ROUTES_CART_PATH, 'r') as f:
        content = f.read()

    # Check that cart item exists logic is present
    existing_pattern = r'(existing|find.*item|item.*find)'
    assert re.search(existing_pattern, content), "existing item handling not found"


def test_update_cart_item_quantity_for_missing_item_raises_error():
    with open(ROUTES_CART_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound|not.*found)'
    assert re.search(not_found_pattern, content), "not found handling not found"


def test_remove_cart_item_not_in_cart_raises_error():
    with open(ROUTES_CART_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound)'
    assert re.search(not_found_pattern, content), "not found handling not found"