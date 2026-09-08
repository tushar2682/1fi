package com.onefi.marketplace.model;

public class UserCredit {
    private String userId;
    private String userName;
    private double totalCreditLimit;
    private double availableCreditLimit;
    private double pledgedMutualFundValue;
    private String status; // "APPROVED", "ACTIVE"
    private String creditScoreCategory; // "EXCELLENT"

    public UserCredit() {}

    public UserCredit(String userId, String userName, double totalCreditLimit, double availableCreditLimit,
                      double pledgedMutualFundValue, String status, String creditScoreCategory) {
        this.userId = userId;
        this.userName = userName;
        this.totalCreditLimit = totalCreditLimit;
        this.availableCreditLimit = availableCreditLimit;
        this.pledgedMutualFundValue = pledgedMutualFundValue;
        this.status = status;
        this.creditScoreCategory = creditScoreCategory;
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public double getTotalCreditLimit() { return totalCreditLimit; }
    public void setTotalCreditLimit(double totalCreditLimit) { this.totalCreditLimit = totalCreditLimit; }

    public double getAvailableCreditLimit() { return availableCreditLimit; }
    public void setAvailableCreditLimit(double availableCreditLimit) { this.availableCreditLimit = availableCreditLimit; }

    public double getPledgedMutualFundValue() { return pledgedMutualFundValue; }
    public void setPledgedMutualFundValue(double pledgedMutualFundValue) { this.pledgedMutualFundValue = pledgedMutualFundValue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCreditScoreCategory() { return creditScoreCategory; }
    public void setCreditScoreCategory(String creditScoreCategory) { this.creditScoreCategory = creditScoreCategory; }
}
