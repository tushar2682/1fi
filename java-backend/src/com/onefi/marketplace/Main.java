package com.onefi.marketplace;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import com.onefi.marketplace.model.*;
import com.onefi.marketplace.repository.ProductRepository;
import com.onefi.marketplace.service.EmiCalculatorService;
import com.onefi.marketplace.util.JsonUtils;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class Main {
    private static final int PORT = 8085;
    private static final ProductRepository productRepo = new ProductRepository();
    private static final EmiCalculatorService emiService = new EmiCalculatorService();
    private static final UserCredit currentUser = new UserCredit(
        "usr_1fi_99", "Tushar Uniyal", 150000.0, 150000.0, 320000.0, "APPROVED", "EXCELLENT"
    );

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        server.createContext("/api/v1/products", new ProductHandler());
        server.createContext("/api/v1/emi/calculate", new EmiHandler());
        server.createContext("/api/v1/user/credit-limit", new UserHandler());
        server.createContext("/api/v1/checkout/apply-emi", new CheckoutHandler());
        server.createContext("/", new CatchAllHandler());

        server.setExecutor(null);
        System.out.println("=================================================");
        System.out.println(" 🚀 1Fi Marketplace Java REST API Server Started");
        System.out.println(" Listening on http://localhost:" + PORT);
        System.out.println("=================================================");
        server.start();
    }

    private static void sendCorsAndResponse(HttpExchange exchange, int statusCode, String responseJson) throws java.io.IOException {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        byte[] bytes = responseJson.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(statusCode, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }

    // Handler: /api/v1/products and /api/v1/products/{id}
    static class ProductHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws java.io.IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendCorsAndResponse(exchange, 204, "");
                return;
            }

            URI uri = exchange.getRequestURI();
            String path = uri.getPath();
            Map<String, String> queryParams = parseQueryParams(uri.getQuery());

            if (path.matches("^/api/v1/products/[^/]+$")) {
                String id = path.substring(path.lastIndexOf('/') + 1);
                Optional<Product> productOpt = productRepo.findById(id);
                if (productOpt.isPresent()) {
                    String json = "{\"status\":\"success\",\"data\":" + JsonUtils.toJson(productOpt.get()) + "}";
                    sendCorsAndResponse(exchange, 200, json);
                } else {
                    sendCorsAndResponse(exchange, 404, "{\"status\":\"error\",\"message\":\"Product not found\"}");
                }
                return;
            }

            // List products with filter
            String category = queryParams.get("category");
            String brand = queryParams.get("brand");
            String search = queryParams.get("search");
            String sortBy = queryParams.get("sortBy");
            Double minPrice = queryParams.containsKey("minPrice") ? Double.parseDouble(queryParams.get("minPrice")) : null;
            Double maxPrice = queryParams.containsKey("maxPrice") ? Double.parseDouble(queryParams.get("maxPrice")) : null;

            List<Product> list = productRepo.findAll(category, brand, search, minPrice, maxPrice, sortBy);
            String json = "{\"status\":\"success\",\"count\":" + list.size() + ",\"data\":" + JsonUtils.toJson(list) + "}";
            sendCorsAndResponse(exchange, 200, json);
        }
    }

    // Handler: /api/v1/emi/calculate
    static class EmiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws java.io.IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendCorsAndResponse(exchange, 204, "");
                return;
            }

            URI uri = exchange.getRequestURI();
            Map<String, String> queryParams = parseQueryParams(uri.getQuery());

            double price = 50000.0;
            boolean isNoCost = true;

            if (queryParams.containsKey("price")) {
                try {
                    price = Double.parseDouble(queryParams.get("price"));
                } catch (Exception ignored) {}
            }
            if (queryParams.containsKey("noCost")) {
                isNoCost = Boolean.parseBoolean(queryParams.get("noCost"));
            }

            List<EmiPlan> plans = emiService.calculatePlans(price, isNoCost);
            String json = "{\"status\":\"success\",\"principalPrice\":" + price + ",\"plans\":" + JsonUtils.toJson(plans) + "}";
            sendCorsAndResponse(exchange, 200, json);
        }
    }

    // Handler: /api/v1/user/credit-limit
    static class UserHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws java.io.IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendCorsAndResponse(exchange, 204, "");
                return;
            }
            String json = "{\"status\":\"success\",\"data\":" + JsonUtils.toJson(currentUser) + "}";
            sendCorsAndResponse(exchange, 200, json);
        }
    }

    // Handler: /api/v1/checkout/apply-emi
    static class CheckoutHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws java.io.IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendCorsAndResponse(exchange, 204, "");
                return;
            }

            String requestBody = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            
            String bookingId = "1FI-EMI-" + System.currentTimeMillis();
            String responseJson = "{"
                + "\"status\":\"success\","
                + "\"message\":\"1Fi Mutual Fund Credit EMI booking confirmed successfully!\","
                + "\"bookingId\":\"" + bookingId + "\","
                + "\"approvalStatus\":\"APPROVED_INSTANT\","
                + "\"creditLimitRemaining\":123010.0"
                + "}";
            sendCorsAndResponse(exchange, 200, responseJson);
        }
    }

    // Catch-all handler for unregistered paths (health check, favicon, etc.)
    static class CatchAllHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws java.io.IOException {
            String path = exchange.getRequestURI().getPath();
            if (path.equals("/") || path.equals("/health")) {
                String json = "{\"status\":\"ok\",\"service\":\"1Fi Marketplace API\",\"version\":\"1.0.0\"}";
                sendCorsAndResponse(exchange, 200, json);
            } else {
                sendCorsAndResponse(exchange, 404, "{\"status\":\"error\",\"message\":\"Endpoint not found: " + path + "\"}");
            }
        }
    }

    private static Map<String, String> parseQueryParams(String query) {
        Map<String, String> map = new HashMap<>();
        if (query == null || query.isBlank()) return map;
        for (String param : query.split("&")) {
            String[] pair = param.split("=");
            if (pair.length > 1) {
                map.put(pair[0], java.net.URLDecoder.decode(pair[1], StandardCharsets.UTF_8));
            } else if (pair.length == 1) {
                map.put(pair[0], "");
            }
        }
        return map;
    }
}
