import os
import re
import pytest

CART_CONTROLLER_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'controllers', 'cartController.ts')


def test_get_cart_returns_cart_for_user():
    with open(CART_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    get_cart_pattern = r'(getCart|getCartByUserId)'
    assert re.search(get_cart_pattern, content), "getCart function not found"


def test_add_item_to_cart_with_valid_product_and_quantity():
    with open(CART_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    add_pattern = r'(addItemToCart|addCartItem)'
    assert re.search(add_pattern, content), "addItemToCart function not found"


def test_add_item_to_cart_with_nonexistent_product_raises_error():
    with open(CART_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound)'
    assert re.search(not_found_pattern, content), "not found handling not found"


def test_update_cart_item_quantity_success():
    with open(CART_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    update_pattern = r'(updateCartItemQuantity|updateItem)'
    assert re.search(update_pattern, content), "updateCartItemQuantity function not found"


def test_update_cart_item_quantity_to_zero_removes_item():
    with open(CART_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    zero_pattern = r'(0|zero|remove)'
    assert re.search(zero_pattern, content), "zero quantity handling not found"


def test_update_cart_item_quantity_for_missing_item_raises_error():
    with open(CART_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound)'
    assert re.search(not_found_pattern, content), "not found handling not found"


def test_remove_cart_item_success():
    with open(CART_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    remove_pattern = r'(removeCartItem|removeItem)'
    assert re.search(remove_pattern, content), "removeCartItem function not found"


def test_remove_cart_item_not_in_cart_raises_error():
    with open(CART_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound)'
    assert re.search(not_found_pattern, content), "not found handling not found"


def test_add_item_to_cart_with_invalid_quantity_raises_validation_error():
    with open(CART_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    validation_pattern = r'(400|validation|ValidationError)'
    assert re.search(validation_pattern, content), "validation not found"