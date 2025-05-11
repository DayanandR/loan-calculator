export const getLoanAmortization = async (amount, rate, tenureYears) => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const months = parseInt(tenureYears) * 12;
    const monthlyRate = annualRate / 12 / 100;
  
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
  
    const result = [];
    let balance = principal;
  
    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      const principalPayment = emi - interest;
      balance -= principalPayment;
  
      result.push({
        month: i,
        emi: emi.toFixed(2),
        interest: interest.toFixed(2),
        principal: principalPayment.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }
  
    return result;
  };
  