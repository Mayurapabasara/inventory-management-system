package com.inventorymanagement.inventory_management_backend.Exseption;

public class InventoryNotFoundException extends RuntimeException {
    public InventoryNotFoundException(Long id) {
        super("Could not find inventory with id " + id);
    }

    public InventoryNotFoundException(String message) {
        super(message);
    }
}
