package com.inventorymanagement.inventory_management_backend.controller;

import com.inventorymanagement.inventory_management_backend.model.InventoryModel;
import com.inventorymanagement.inventory_management_backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventoryModel) {
        return inventoryRepository.save(newInventoryModel);
    }

    @PostMapping("/inventory/itemImg")
    public String itemImage(@RequestParam ("file") MultipartFile file) {
        String folder = "src/main/Upload/";
        String itemImage = file.getOriginalFilename();

        try {
            File uploadDir = new File(folder);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            file.transferTo(Paths.get(folder + itemImage).toFile());
        }catch (IOException e) {
            e.printStackTrace();
            return "error"+itemImage;
        }
        return itemImage;
    }
}
