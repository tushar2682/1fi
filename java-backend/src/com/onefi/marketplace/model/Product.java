package com.onefi.marketplace.model;

import java.util.List;
import java.util.Map;

public class Product {
    private String id;
    private String brand;
    private String title;
    private String description;
    private String category; 
    private double basePrice;
    private double originalPrice;
    private double rating;
    private int reviewsCount;
    private String badge; 
    private String primaryImage;
    private List<String> images;
    private Map<String, String> specs;
    private List<ProductVariant> variants;
    private boolean isNoCostEmiAvailable;
    private double startingEmi;

    public Product() {}

    public Product(String id, String brand, String title, String description, String category,
                   double basePrice, double originalPrice, double rating, int reviewsCount,
                   String badge, String primaryImage, List<String> images, Map<String, String> specs,
                   List<ProductVariant> variants, boolean isNoCostEmiAvailable, double startingEmi) {
        this.id = id;
        this.brand = brand;
        this.title = title;
        this.description = description;
        this.category = category;
        this.basePrice = basePrice;
        this.originalPrice = originalPrice;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
        this.badge = badge;
        this.primaryImage = primaryImage;
        this.images = images;
        this.specs = specs;
        this.variants = variants;
        this.isNoCostEmiAvailable = isNoCostEmiAvailable;
        this.startingEmi = startingEmi;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getBasePrice() { return basePrice; }
    public void setBasePrice(double basePrice) { this.basePrice = basePrice; }

    public double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(double originalPrice) { this.originalPrice = originalPrice; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(int reviewsCount) { this.reviewsCount = reviewsCount; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getPrimaryImage() { return primaryImage; }
    public void setPrimaryImage(String primaryImage) { this.primaryImage = primaryImage; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public Map<String, String> getSpecs() { return specs; }
    public void setSpecs(Map<String, String> specs) { this.specs = specs; }

    public List<ProductVariant> getVariants() { return variants; }
    public void setVariants(List<ProductVariant> variants) { this.variants = variants; }

    public boolean isNoCostEmiAvailable() { return isNoCostEmiAvailable; }
    public void setNoCostEmiAvailable(boolean noCostEmiAvailable) { isNoCostEmiAvailable = noCostEmiAvailable; }

    public double getStartingEmi() { return startingEmi; }
    public void setStartingEmi(double startingEmi) { this.startingEmi = startingEmi; }
}
