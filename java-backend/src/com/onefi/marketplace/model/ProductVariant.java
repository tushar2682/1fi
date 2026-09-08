package com.onefi.marketplace.model;

public class ProductVariant {
    private String id;
    private String name; // e.g. "256GB / Space Black"
    private String color; // e.g. "Space Black"
    private String colorHex; // e.g. "#1C1C1E"
    private String storage; // e.g. "256GB" or "M3 / 16GB"
    private double priceOffset; // price difference relative to base price
    private String image; // variant specific image URL
    private boolean inStock;

    public ProductVariant() {}

    public ProductVariant(String id, String name, String color, String colorHex, String storage, double priceOffset, String image, boolean inStock) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.colorHex = colorHex;
        this.storage = storage;
        this.priceOffset = priceOffset;
        this.image = image;
        this.inStock = inStock;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getColorHex() { return colorHex; }
    public void setColorHex(String colorHex) { this.colorHex = colorHex; }

    public String getStorage() { return storage; }
    public void setStorage(String storage) { this.storage = storage; }

    public double getPriceOffset() { return priceOffset; }
    public void setPriceOffset(double priceOffset) { this.priceOffset = priceOffset; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public boolean isInStock() { return inStock; }
    public void setInStock(boolean inStock) { this.inStock = inStock; }
}
