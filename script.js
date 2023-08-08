const classSelect = {
  0: "KG",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "11",
  12: "12",
};

const numberOfChildrenSelect = document.getElementById("numberOfChildren");
const childFieldsContainer = document.getElementById("childFields");

// Get the parent container of receipt and early palyment element
const parentReceipt = document.querySelector(".hidden-receipt");
// Get the receipt element
const receipt = document.getElementById("receipt");
// Get the early payment discount receipt element
const earlyPayment = document.getElementById("early-payment-discount");
const modal = document.querySelector(".model");
const overLay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-model");

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

// Calculate discount function
function applyDiscount(amount, discountPercentage) {
  const discountAmount = amount * (discountPercentage / 100);
  const discountedPrice = amount - discountAmount;
  return discountedPrice;
}

// Calculate discount for early payment
function earlyPaymentDiscount(studentClass) {
  if (studentClass >= 0 && studentClass <= 3) {
    return 10;
  } else if (studentClass >= 4 && studentClass <= 12) {
    return 5;
  }
}

// Function to attach element to receipt element or early payment discount element
function attachElement(p1text, p2text, optionalClass, element) {
  const item = document.createElement("div");
  item.className = `item ${optionalClass ? "optional" : ""}`;
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  p1.className = "description";
  p2.className = "total";
  p1.textContent = p1text;
  p2.textContent = p2text;
  item.appendChild(p1);
  item.appendChild(p2);
  element.appendChild(item);
}

// Add event listener to form submission
document
  .getElementById("childrenForm")
  .addEventListener("submit", calculateFees);

// Add event listener to child selector
numberOfChildrenSelect.addEventListener("change", () => {
  // Get the number of children
  const numberofChildren = parseInt(numberOfChildrenSelect.value);

  // Clear existing child fields
  childFieldsContainer.innerHTML = "";

  // Create and append the new child fields besed on the selected number
  for (let i = 1; i <= numberofChildren; i++) {
    // Create a div to hold child name and class field
    const childField = document.createElement("div");

    // Create and append the child name field
    const childLabelField = document.createElement("label");
    // childLabelField.for = `${i}`;
    // childLabelField.innerHTML = `Child ${i}: `;
    // childField.appendChild(childLabelField);

    // Create and append the child class select element
    const childClassSelect = document.createElement("select");
    childClassSelect.name = "childClass";
    childClassSelect.id = i;
    childClassSelect.required = true;
    childClassSelect.className = "form-control";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = `Select class for child ${i}`;
    defaultOption.selected = true;
    defaultOption.disabled = true;
    childClassSelect.append(defaultOption);

    // Add options for class KG to 12
    for (let j = 0; j <= 12; j++) {
      const option = document.createElement("option");
      if (j === 0) {
        option.value = j;
        option.text = "Class KG";
      } else {
        option.value = j;
        option.text = "Class" + j;
      }
      childClassSelect.append(option);
    }

    childField.appendChild(childClassSelect);

    // Append th child field to the container
    childFieldsContainer.appendChild(childField);
  }
});

// Add event listenerer on button to open modal
btnOpenModal.addEventListener("click", toggleHiddenClass);
// Add event listenere on button to close modal
btnCloseModal.addEventListener("click", toggleHiddenClass);
// Add event listener on overlay to close modal
overLay.addEventListener("click", toggleHiddenClass);

// Function to toggle hidden class
function toggleHiddenClass() {
  modal.classList.toggle("hidden");
  overLay.classList.toggle("hidden");
}

// Calculate fees function
function calculateFees(event) {
  event.preventDefault();
  parentReceipt.classList.remove("hidden-receipt");
  receipt.innerHTML = "";
  earlyPayment.innerHTML = "";

  // Get the number of children
  const numberOfChildren = parseInt(numberOfChildrenSelect.value);

  // Get the option for bus
  const busOption = parseInt(document.getElementById("busOption").value);

  // Initialize an array of children with values as their section
  let childArray = [];

  for (let i = 1; i <= numberOfChildren; i++) {
    // Get the child class select field
    let childClassSelect = document.getElementById(i);

    // Get the value for selected class
    const selectedClass = parseInt(childClassSelect.value);

    childArray.push(selectedClass);
  }

  // Sort the child array from largest to smallest class
  childArray.sort((a, b) => b - a);

  let totalFees = 0;
  let totalBusFees = 0;
  let totalEarlyPaymentFees = 0;

  // Calculate Tution Fees for each child
  for (i = 0; i < childArray.length; i++) {
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
}
