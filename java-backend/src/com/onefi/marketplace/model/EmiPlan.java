package com.onefi.marketplace.model;

public class EmiPlan {
    private int tenureMonths;
    private double monthlyAmount;
    private double totalPayable;
    private double interestRate; // Annual rate percentage, e.g. 0.0 or 10.5
    private double totalInterest;
    private double processingFee; // ₹0 for 1Fi users
    private boolean isNoCost;
    private double oneFiSavings; // Savings compared to standard bank credit card EMI

    public EmiPlan() {}

    public EmiPlan(int tenureMonths, double monthlyAmount, double totalPayable, double interestRate,
                   double totalInterest, double processingFee, boolean isNoCost, double savings) {
        this.tenureMonths = tenureMonths;
        this.monthlyAmount = monthlyAmount;
        this.totalPayable = totalPayable;
        this.interestRate = interestRate;
        this.totalInterest = totalInterest;
        this.processingFee = processingFee;
        this.isNoCost = isNoCost;
        this.oneFiSavings = savings;
    }

    public int getTenureMonths() { return tenureMonths; }
    public void setTenureMonths(int tenureMonths) { this.tenureMonths = tenureMonths; }

    public double getMonthlyAmount() { return monthlyAmount; }
    public void setMonthlyAmount(double monthlyAmount) { this.monthlyAmount = monthlyAmount; }

    public double getTotalPayable() { return totalPayable; }
    public void setTotalPayable(double totalPayable) { this.totalPayable = totalPayable; }

    public double getInterestRate() { return interestRate; }
    public void setInterestRate(double interestRate) { this.interestRate = interestRate; }

    public double getTotalInterest() { return totalInterest; }
    public void setTotalInterest(double totalInterest) { this.totalInterest = totalInterest; }

    public double getProcessingFee() { return processingFee; }
    public void setProcessingFee(double processingFee) { this.processingFee = processingFee; }

    public boolean isNoCost() { return isNoCost; }
    public void setNoCost(boolean noCost) { isNoCost = noCost; }

    public double getOneFiSavings() { return oneFiSavings; }
    public void setOneFiSavings(double savings) { this.oneFiSavings = savings; }
}

