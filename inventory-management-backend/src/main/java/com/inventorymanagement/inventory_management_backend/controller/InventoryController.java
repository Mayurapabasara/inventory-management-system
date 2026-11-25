package com.inventorymanagement.inventory_management_backend.controller;

import com.inventorymanagement.inventory_management_backend.Exseption.InventoryNotFoundException;
import com.inventorymanagement.inventory_management_backend.model.InventoryModel;
import com.inventorymanagement.inventory_management_backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventoryModel) {
        return inventoryRepository.save(newInventoryModel);
    }

//    @PostMapping("/inventory/itemImg")
//    public String itemImage(@RequestParam ("file") MultipartFile file) {
//        String folder = "src/main/Upload/";
//        String itemImage = file.getOriginalFilename();
//
//        try {
//            File uploadDir = new File(folder);
//            if (!uploadDir.exists()) {
//                uploadDir.mkdir();
//            }
//            file.transferTo(Paths.get(folder + itemImage).toFile());
//        }catch (IOException e) {
//            e.printStackTrace();
//            return "error"+itemImage;
//        }
//        return itemImage;
//    }

    @PostMapping("/inventory/itemImg")
    public String itemImage(@RequestParam("file") MultipartFile file) {
        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || originalFilename.isBlank()) {
            return "error-invalid-filename";
        }

        String itemImage = Paths.get(originalFilename)
                .getFileName()
                .toString();

        try {
            Path uploadDirectory = Paths.get("uploads")
                    .toAbsolutePath()
                    .normalize();

            Files.createDirectories(uploadDirectory);

            Path destination = uploadDirectory.resolve(itemImage);
            file.transferTo(destination);

            return itemImage;
        } catch (IOException e) {
            e.printStackTrace();
            return "error" + itemImage;
        }
    }

    @GetMapping("/inventory")
    List<InventoryModel> getAllItems() {
        return inventoryRepository.findAll();
    }

    @GetMapping("/inventory/{id}")
    InventoryModel getItemById(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElseThrow(() -> new InventoryNotFoundException(id));
    }

//    private final String UPLOAD_DIR = "src/main/upload";
//    @GetMapping("/upload/{filename}")
//    public ResponseEntity<FileSystemResource> getFile(@PathVariable String filename) {
//        File file = new File(UPLOAD_DIR + filename);
//        if (!file.exists()) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(new FileSystemResource(file));
//    }

    private final String UPLOAD_DIR = "uploads";

    @GetMapping("/upload/{filename}")
    public ResponseEntity<FileSystemResource> getFile(
            @PathVariable String filename) {

        Path directory = Paths.get(UPLOAD_DIR)
                .toAbsolutePath()
                .normalize();

        Path file = directory.resolve(filename).normalize();

        if (!file.startsWith(directory)
                || !Files.isRegularFile(file)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new FileSystemResource(file));
    }

    @PutMapping("/inventory/{id}")
    public InventoryModel updateInventoryModel(@PathVariable Long id, @RequestBody InventoryModel newInventoryModel) {
        return inventoryRepository.findById(id)
                .map(inventoryModel -> {
                    inventoryModel.setItemImage(newInventoryModel.getItemImage());
                    inventoryModel.setItemName(newInventoryModel.getItemName());
                    inventoryModel.setItemCategory(newInventoryModel.getItemCategory());
                    inventoryModel.setItemDetails(newInventoryModel.getItemDetails());
                    return inventoryRepository.save(inventoryModel);
                })
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

}
