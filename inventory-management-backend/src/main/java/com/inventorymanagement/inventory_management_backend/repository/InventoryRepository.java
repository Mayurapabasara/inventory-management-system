package com.inventorymanagement.inventory_management_backend.repository;

import com.inventorymanagement.inventory_management_backend.model.InventoryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository <InventoryModel, Long> {
}
