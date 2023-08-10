import { meisFees } from "./meis.js";

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

// Select the name of school
const schoolOption = document.getElementById("schoolOption");

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

  if (schoolOption.value === "meis") {
    meisFees(childArray, attachElement, classSelect, receipt, earlyPayment, busOption);
  }
}
