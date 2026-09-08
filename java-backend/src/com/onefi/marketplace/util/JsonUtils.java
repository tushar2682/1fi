package com.onefi.marketplace.util;

import com.onefi.marketplace.model.*;

import java.util.List;
import java.util.Map;

public class JsonUtils {

    public static String toJson(Object obj) {
        if (obj == null) return "null";
        if (obj instanceof String) return "\"" + escapeJson((String) obj) + "\"";
        if (obj instanceof Number || obj instanceof Boolean) return obj.toString();
        if (obj instanceof List<?>) return listToJson((List<?>) obj);
        if (obj instanceof Map<?, ?>) return mapToJson((Map<?, ?>) obj);
        if (obj instanceof Product) return productToJson((Product) obj);
        if (obj instanceof ProductVariant) return variantToJson((ProductVariant) obj);
        if (obj instanceof EmiPlan) return emiPlanToJson((EmiPlan) obj);
        if (obj instanceof UserCredit) return userCreditToJson((UserCredit) obj);
        return "\"" + escapeJson(obj.toString()) + "\"";
    }

    public static String listToJson(List<?> list) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < list.size(); i++) {
            sb.append(toJson(list.get(i)));
            if (i < list.size() - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }

    public static String mapToJson(Map<?, ?> map) {
        StringBuilder sb = new StringBuilder("{");
        int i = 0;
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            sb.append("\"").append(escapeJson(entry.getKey().toString())).append("\":");
            sb.append(toJson(entry.getValue()));
            if (i < map.size() - 1) sb.append(",");
            i++;
        }
        sb.append("}");
        return sb.toString();
    }

    private static String productToJson(Product p) {
        StringBuilder sb = new StringBuilder("{");
        sb.append("\"id\":\"").append(escapeJson(p.getId())).append("\",");
        sb.append("\"brand\":\"").append(escapeJson(p.getBrand())).append("\",");
        sb.append("\"title\":\"").append(escapeJson(p.getTitle())).append("\",");
        sb.append("\"description\":\"").append(escapeJson(p.getDescription())).append("\",");
        sb.append("\"category\":\"").append(escapeJson(p.getCategory())).append("\",");
        sb.append("\"basePrice\":").append(p.getBasePrice()).append(",");
        sb.append("\"originalPrice\":").append(p.getOriginalPrice()).append(",");
        sb.append("\"rating\":").append(p.getRating()).append(",");
        sb.append("\"reviewsCount\":").append(p.getReviewsCount()).append(",");
        sb.append("\"badge\":\"").append(escapeJson(p.getBadge())).append("\",");
        sb.append("\"primaryImage\":\"").append(escapeJson(p.getPrimaryImage())).append("\",");
        sb.append("\"images\":").append(listToJson(p.getImages())).append(",");
        sb.append("\"specs\":").append(mapToJson(p.getSpecs())).append(",");
        sb.append("\"variants\":").append(listToJson(p.getVariants())).append(",");
        sb.append("\"isNoCostEmiAvailable\":").append(p.isNoCostEmiAvailable()).append(",");
        sb.append("\"startingEmi\":").append(p.getStartingEmi());
        sb.append("}");
        return sb.toString();
    }

    private static String variantToJson(ProductVariant v) {
        StringBuilder sb = new StringBuilder("{");
        sb.append("\"id\":\"").append(escapeJson(v.getId())).append("\",");
        sb.append("\"name\":\"").append(escapeJson(v.getName())).append("\",");
        sb.append("\"color\":\"").append(escapeJson(v.getColor())).append("\",");
        sb.append("\"colorHex\":\"").append(escapeJson(v.getColorHex())).append("\",");
        sb.append("\"storage\":\"").append(escapeJson(v.getStorage())).append("\",");
        sb.append("\"priceOffset\":").append(v.getPriceOffset()).append(",");
        sb.append("\"image\":\"").append(escapeJson(v.getImage())).append("\",");
        sb.append("\"inStock\":").append(v.isInStock());
        sb.append("}");
        return sb.toString();
    }

    private static String emiPlanToJson(EmiPlan e) {
        StringBuilder sb = new StringBuilder("{");
        sb.append("\"tenureMonths\":").append(e.getTenureMonths()).append(",");
        sb.append("\"monthlyAmount\":").append(e.getMonthlyAmount()).append(",");
        sb.append("\"totalPayable\":").append(e.getTotalPayable()).append(",");
        sb.append("\"interestRate\":").append(e.getInterestRate()).append(",");
        sb.append("\"totalInterest\":").append(e.getTotalInterest()).append(",");
        sb.append("\"processingFee\":").append(e.getProcessingFee()).append(",");
        sb.append("\"isNoCost\":").append(e.isNoCost()).append(",");
        sb.append("\"oneFiSavings\":").append(e.getOneFiSavings());
        sb.append("}");
        return sb.toString();
    }

    private static String userCreditToJson(UserCredit u) {
        StringBuilder sb = new StringBuilder("{");
        sb.append("\"userId\":\"").append(escapeJson(u.getUserId())).append("\",");
        sb.append("\"userName\":\"").append(escapeJson(u.getUserName())).append("\",");
        sb.append("\"totalCreditLimit\":").append(u.getTotalCreditLimit()).append(",");
        sb.append("\"availableCreditLimit\":").append(u.getAvailableCreditLimit()).append(",");
        sb.append("\"pledgedMutualFundValue\":").append(u.getPledgedMutualFundValue()).append(",");
        sb.append("\"status\":\"").append(escapeJson(u.getStatus())).append("\",");
        sb.append("\"creditScoreCategory\":\"").append(escapeJson(u.getCreditScoreCategory())).append("\"");
        sb.append("}");
        return sb.toString();
    }

    private static String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\b", "\\b")
                .replace("\f", "\\f")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
