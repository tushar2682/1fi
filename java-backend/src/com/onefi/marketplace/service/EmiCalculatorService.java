package com.onefi.marketplace.service;

import com.onefi.marketplace.model.EmiPlan;

import java.util.ArrayList;
import java.util.List;

public class EmiCalculatorService {

    private static final double REGULAR_CREDIT_CARD_APR = 0.16; 
    private static final double ONEFI_MF_CREDIT_APR = 0.105;   

    public List<EmiPlan> calculatePlans(double principalPrice, boolean isNoCostEligible) {
        List<EmiPlan> plans = new ArrayList<>();
        int[] tenures = {3, 6, 9, 12, 18, 24};

        for (int n : tenures) {
            boolean isNoCost = isNoCostEligible && (n == 3 || n == 6);
            double monthlyRate = ONEFI_MF_CREDIT_APR / 12.0;
            
            double monthlyAmount;
            double totalPayable;
            double totalInterest;
            double interestRatePct;

            if (isNoCost) {
                interestRatePct = 0.0;
                monthlyAmount = Math.round((principalPrice / n) * 100.0) / 100.0;
                totalPayable = principalPrice;
                totalInterest = 0.0;
            } else {
                interestRatePct = 10.5;
                // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
                double factor = Math.pow(1 + monthlyRate, n);
                monthlyAmount = Math.round((principalPrice * monthlyRate * factor / (factor - 1)) * 100.0) / 100.0;
                totalPayable = Math.round(monthlyAmount * n * 100.0) / 100.0;
                totalInterest = Math.round((totalPayable - principalPrice) * 100.0) / 100.0;
            }

            // Calculate savings vs traditional credit card EMI
            double ccMonthlyRate = REGULAR_CREDIT_CARD_APR / 12.0;
            double ccFactor = Math.pow(1 + ccMonthlyRate, n);
            double ccMonthly = (principalPrice * ccMonthlyRate * ccFactor) / (ccFactor - 1);
            double ccTotalPayable = ccMonthly * n;
            double ccProcessingFee = 199.0 + (principalPrice * 0.01); // Standard 1% processing fee
            double ccTotalCost = ccTotalPayable + ccProcessingFee;

            double oneFiTotalCost = totalPayable; // 0 processing fee
            double savings = Math.max(0, Math.round((ccTotalCost - oneFiTotalCost) * 100.0) / 100.0);

            plans.add(new EmiPlan(
                n,
                monthlyAmount,
                totalPayable,
                interestRatePct,
                totalInterest,
                0.0, // ₹0 processing fee for 1Fi users!
                isNoCost,
                savings
            ));
        }

        return plans;
    }
}
