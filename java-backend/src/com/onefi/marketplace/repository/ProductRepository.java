package com.onefi.marketplace.repository;

import com.onefi.marketplace.model.Product;
import com.onefi.marketplace.model.ProductVariant;

import java.util.*;
import java.util.stream.Collectors;

public class ProductRepository {
    private final List<Product> products = new ArrayList<>();

    public ProductRepository() {
        initCatalog();
    }

    private void initCatalog() {
        // iPhone 16 Pro Max
        List<ProductVariant> variants1 = List.of(
            new ProductVariant("v1-1", "256GB / Natural Titanium", "Natural Titanium", "#9B958C", "256GB", 0.0, "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop", true),
            new ProductVariant("v1-2", "512GB / Desert Titanium", "Desert Titanium", "#C5A087", "512GB", 20000.0, "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop", true),
            new ProductVariant("v1-3", "1TB / White Titanium", "White Titanium", "#F2F2F2", "1TB", 40000.0, "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop", true)
        );
        Map<String, String> specs1 = Map.of(
            "Display", "6.9-inch Super Retina XDR OLED (120Hz)",
            "Chip", "Apple A18 Pro",
            "Main Camera", "48MP Fusion + 48MP Ultra Wide",
            "Battery", "Up to 33 hours video playback"
        );
        products.add(new Product(
            "p1", "Apple", "iPhone 16 Pro Max",
            "Grade 5 titanium design with Camera Control button and Apple Intelligence integration.",
            "Smartphones", 144900.0, 159900.0, 4.9, 1280,
            "0% No Cost EMI", "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop",
            List.of("https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop"),
            specs1, variants1, true, 6037.0
        ));

        // MacBook Pro 16"
        List<ProductVariant> variants2 = List.of(
            new ProductVariant("v2-1", "36GB / 1TB SSD / Space Black", "Space Black", "#2B2B2D", "36GB / 1TB", 0.0, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop", true),
            new ProductVariant("v2-2", "48GB / 1TB SSD / Silver", "Silver", "#E3E4E5", "48GB / 1TB", 35000.0, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop", true)
        );
        Map<String, String> specs2 = Map.of(
            "Processor", "Apple M3 Max (16-core CPU, 40-core GPU)",
            "RAM", "36GB Unified Memory",
            "Storage", "1TB SSD",
            "Display", "16.2-inch Liquid Retina XDR"
        );
        products.add(new Product(
            "p2", "Apple", "MacBook Pro 16\" M3 Max",
            "Pro performance featuring M3 Max architecture, Liquid Retina XDR display, and all-day battery life.",
            "Laptops", 349900.0, 399900.0, 4.9, 430,
            "1Fi Approved", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop",
            List.of("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop"),
            specs2, variants2, true, 14579.0
        ));

        // Samsung Galaxy S25 Ultra
        List<ProductVariant> variants3 = List.of(
            new ProductVariant("v3-1", "12GB / 256GB / Titanium Gray", "Titanium Gray", "#5A5B5E", "256GB", 0.0, "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop", true),
            new ProductVariant("v3-2", "12GB / 512GB / Titanium Black", "Titanium Black", "#1E1E1F", "512GB", 15000.0, "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop", true)
        );
        Map<String, String> specs3 = Map.of(
            "Processor", "Snapdragon 8 Gen 4 for Galaxy",
            "Camera", "200MP Main + 50MP 5x Optical Telephoto",
            "Screen", "6.8-inch Dynamic AMOLED 2X 120Hz",
            "Pen", "Integrated S Pen"
        );
        products.add(new Product(
            "p3", "Samsung", "Galaxy S25 Ultra 5G",
            "Galaxy AI camera flagship with S Pen, 200MP camera system, and titanium frame.",
            "Smartphones", 129999.0, 144999.0, 4.8, 890,
            "0% No Cost EMI", "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop",
            List.of("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop"),
            specs3, variants3, true, 5416.0
        ));

        // Sony WH-1000XM5
        List<ProductVariant> variants4 = List.of(
            new ProductVariant("v4-1", "Black", "Black", "#111111", "Standard", 0.0, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop", true),
            new ProductVariant("v4-2", "Silver", "Silver", "#DCDCDC", "Standard", 0.0, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop", true)
        );
        Map<String, String> specs4 = Map.of(
            "Noise Canceling", "Dual processor Auto NC Optimizer",
            "Battery Life", "30 hours playback",
            "Audio Codec", "LDAC / High-Resolution Audio Wireless"
        );
        products.add(new Product(
            "p4", "Sony", "WH-1000XM5 Noise Canceling Headphones",
            "Industry leading noise cancellation with two processors and 8 microphones for crystal clear audio.",
            "Audio", 26990.0, 34990.0, 4.7, 2150,
            "Best Seller", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
            List.of("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop"),
            specs4, variants4, true, 1124.0
        ));

        // Apple Watch Ultra 2
        List<ProductVariant> variants5 = List.of(
            new ProductVariant("v5-1", "Titanium / Blue Ocean Band", "Blue", "#0F4C81", "49mm", 0.0, "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop", true),
            new ProductVariant("v5-2", "Black Titanium / Trail Loop", "Black Titanium", "#1C1C1E", "49mm", 5000.0, "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop", true)
        );
        Map<String, String> specs5 = Map.of(
            "Case", "49mm Aerospace-grade Titanium",
            "Display Brightness", "3000 nits Always-On Retina",
            "Water Rating", "100m water resistant"
        );
        products.add(new Product(
            "p5", "Apple", "Apple Watch Ultra 2",
            "Rugged 49mm titanium case with precision dual-frequency GPS and 3000-nit display.",
            "Wearables", 89900.0, 89900.0, 4.9, 640,
            "0% No Cost EMI", "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop",
            List.of("https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop"),
            specs5, variants5, true, 3745.0
        ));

        // Dell XPS 15
        List<ProductVariant> variants6 = List.of(
            new ProductVariant("v6-1", "i9 / 32GB / 1TB SSD / RTX 4070", "Platinum Silver", "#E0E0E0", "32GB / 1TB", 0.0, "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop", true)
        );
        Map<String, String> specs6 = Map.of(
            "Processor", "Intel Core i9-13900H",
            "Graphics", "NVIDIA GeForce RTX 4070 8GB",
            "Display", "15.6-inch 3.5K OLED Touch"
        );
        products.add(new Product(
            "p6", "Dell", "Dell XPS 15 OLED Touch",
            "High-performance creator laptop with 3.5K OLED touchscreen display and discrete RTX graphics.",
            "Laptops", 224990.0, 259990.0, 4.6, 310,
            "High Performance", "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop",
            List.of("https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop"),
            specs6, variants6, true, 9374.0
        ));
    }

    public List<Product> findAll(String category, String brand, String search, Double minPrice, Double maxPrice, String sortBy) {
        return products.stream()
            .filter(p -> category == null || category.equalsIgnoreCase("All") || p.getCategory().equalsIgnoreCase(category))
            .filter(p -> brand == null || brand.equalsIgnoreCase("All") || p.getBrand().equalsIgnoreCase(brand))
            .filter(p -> search == null || search.isBlank() ||
                p.getTitle().toLowerCase().contains(search.toLowerCase()) ||
                p.getBrand().toLowerCase().contains(search.toLowerCase()) ||
                p.getDescription().toLowerCase().contains(search.toLowerCase()))
            .filter(p -> minPrice == null || p.getBasePrice() >= minPrice)
            .filter(p -> maxPrice == null || p.getBasePrice() <= maxPrice)
            .sorted((a, b) -> {
                if ("price_asc".equalsIgnoreCase(sortBy)) return Double.compare(a.getBasePrice(), b.getBasePrice());
                if ("price_desc".equalsIgnoreCase(sortBy)) return Double.compare(b.getBasePrice(), a.getBasePrice());
                if ("rating".equalsIgnoreCase(sortBy)) return Double.compare(b.getRating(), a.getRating());
                return b.getReviewsCount() - a.getReviewsCount();
            })
            .collect(Collectors.toList());
    }

    public Optional<Product> findById(String id) {
        return products.stream().filter(p -> p.getId().equals(id)).findFirst();
    }
}
