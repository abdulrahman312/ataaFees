// Calculate fees based on the selected class
function calculateFeesClass(selectedClass) {
  let fees = 0;
  if (selectedClass === 0) {
    fees = 19500;
  } else if (selectedClass >= 1 && selectedClass <= 6) {
    fees = 22750;
  } else if (selectedClass >= 7 && selectedClass <= 9) {
    fees = 24500;
  } else if (selectedClass >= 10 && selectedClass <= 12) {
    fees = 28000;
  }

  return fees;
}

// Calculate fees for bus based on the selected option
function calculateBusFees(selectedOption) {
  let fees = 0;
  if (selectedOption === 1) {
    fees = 4500;
  } else if (selectedOption === 2) {
    fees = 5000;
  }

  return fees;
}

// Calculate discount for early payment
function earlyPaymentDiscount(studentClass) {
  if (studentClass >= 0 && studentClass <= 3) {
    return 10;
  } else if (studentClass >= 4 && studentClass <= 12) {
    return 5;
  }
}

// Calculate discount function
function applyDiscount(amount, discountPercentage) {
  const discountAmount = amount * (discountPercentage / 100);
  const discountedPrice = amount - discountAmount;
  return discountedPrice;
}

export const meisFees = (
  childArray,
  attachElement,
  classSelect,
  receipt,
  earlyPayment,
  busOption
) => {
  let totalFees = 0;
  let totalBusFees = 0;
  let totalEarlyPaymentFees = 0;

  for (let i = 0; i < childArray.length; i++) {
    if (i === 0) {
      let tutionFees = calculateFeesClass(childArray[i]);
      let earlyDiscountFees = Math.round(
        applyDiscount(tutionFees, earlyPaymentDiscount(childArray[i]))
      );
      attachElement(
        `Tution fees for child ${i + 1} in class ${
          classSelect[childArray[i]]
        }: `,
        tutionFees,
        false,
        receipt
      );

      attachElement(
        `${earlyPaymentDiscount(
          childArray[i]
        )}% discount in tution fees for child ${i + 1} in class ${
          classSelect[childArray[i]]
        }: `,
        earlyDiscountFees,
        false,
        earlyPayment
      );

      totalFees += tutionFees;
      totalEarlyPaymentFees += earlyDiscountFees;
    } else if (i === 1) {
      let tutionFees = calculateFeesClass(childArray[i]);
      attachElement(
        `Tution fees for child ${i + 1} in class ${
          classSelect[childArray[i]]
        }: `,
        tutionFees,
        false,
        receipt
      );

      let discountFees = Math.round(applyDiscount(tutionFees, 5));
      let earlyDiscountFees = Math.round(
        applyDiscount(discountFees, earlyPaymentDiscount(childArray[i]))
      );
      attachElement(
        `Tution fees for child ${i + 1} in class ${
          classSelect[childArray[i]]
        } after 5% sibling discount: `,
        discountFees,
        false,
        receipt
      );

      attachElement(
        `${earlyPaymentDiscount(
          childArray[i]
        )}% discount in tution fees for child ${i + 1} in class ${
          classSelect[childArray[i]]
        }: `,
        earlyDiscountFees,
        false,
        earlyPayment
      );

      totalFees += discountFees;
      totalEarlyPaymentFees += earlyDiscountFees;
    } else {
      let tutionFees = calculateFeesClass(childArray[i]);
      attachElement(
        `Tution fees for child ${i + 1} in class ${
          classSelect[childArray[i]]
        }: `,
        tutionFees,
        false,
        receipt
      );

      let discountFees = Math.round(applyDiscount(tutionFees, 10));
      let earlyDiscountFees = Math.round(
        applyDiscount(discountFees, earlyPaymentDiscount(childArray[i]))
      );
      attachElement(
        `Tution fees for child ${i + 1} in class ${
          classSelect[childArray[i]]
        } after 10% sibling discount: `,
        discountFees,
        false,
        receipt
      );

      attachElement(
        `${earlyPaymentDiscount(
          childArray[i]
        )}% discount in tution fees for child ${i + 1} in class ${
          classSelect[childArray[i]]
        }: `,
        earlyDiscountFees,
        false,
        earlyPayment
      );
      totalFees += discountFees;
      totalEarlyPaymentFees += earlyDiscountFees;
    }
  }

  // Total tution fees
  attachElement(`Total tution fees: `, totalFees, true, receipt);
  // With VAT
  attachElement(
    `Total tution fees with 15% VAT: `,
    Math.round(totalFees * 1.15),
    true,
    receipt
  );

  // Total early discount fees
  attachElement(
    `Total discounted fees: `,
    totalEarlyPaymentFees,
    true,
    earlyPayment
  );
  // With VAT
  attachElement(
    `Total discounted fees with VAT: `,
    Math.round(totalEarlyPaymentFees * 1.15),
    false,
    earlyPayment
  );

  // Calculate Bus Fees
  if (busOption === 1 || busOption === 2) {
    for (i = 0; i < childArray.length; i++) {
      if (i === 0) {
        let busFees = calculateBusFees(busOption);
        attachElement(
          `${busOption} way bus fees for child ${i + 1} in class ${
            classSelect[childArray[i]]
          }: `,
          busFees,
          false,
          receipt
        );
        if (childArray.length > 1) {
          busFees = applyDiscount(busFees, 5);
          attachElement(
            `${busOption} way bus Fees for child ${i + 1} in class ${
              classSelect[childArray[i]]
            } after 5% sibling discount: `,
            busFees,
            false,
            receipt
          );
        }
        totalBusFees += busFees;
      } else if (i === 1) {
        let busFees = calculateBusFees(busOption);
        attachElement(
          `${busOption} way bus fees for child ${i + 1} in class ${
            classSelect[childArray[i]]
          }: `,
          busFees,
          false,
          receipt
        );
        busFees = applyDiscount(busFees, 10);
        attachElement(
          `${busOption} way bus fees for child ${i + 1} in class ${
            classSelect[childArray[i]]
          } after 10% sibling discount: `,
          busFees,
          false,
          receipt
        );
        totalBusFees += busFees;
      } else {
        let busFees = calculateBusFees(busOption);
        attachElement(
          `${busOption} way bus fees for child ${i + 1} in class ${
            classSelect[childArray[i]]
          }: `,
          busFees,
          false,
          receipt
        );
        busFees = applyDiscount(busFees, 15);
        attachElement(
          `${busOption} way bus fees for child ${i + 1} in class ${
            classSelect[childArray[i]]
          } after 15% sibling discount: `,
          busFees,
          false,
          receipt
        );
        totalBusFees += busFees;
      }
    }
    // Total Bus Fees
    attachElement(`Total transportation fees: `, totalBusFees, true, receipt);
    // With VAT
    attachElement(
      `Total transportation fees with 15% VAT: `,
      Math.round(totalBusFees * 1.15),
      true,
      receipt
    );
  }

  // Grand Total with VAT
  attachElement(
    `Grand Total with 15% VAT: `,
    Math.round((totalFees + totalBusFees) * 1.15),
    false,
    receipt
  );

  console.log("he");
};
