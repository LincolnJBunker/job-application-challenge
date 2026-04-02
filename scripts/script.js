/**
 * Author: Lincoln Bunker
 * Date: 1 April 2026
 * Purpose: Functionality for job application
 */

"use strict";

//function for phone number validation
const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone); //must be 10 digits long
}

//function for LinkedIn profile URL
const validateLinkedIn = (url) => {
    return /^https:\/\/www\.linkedin\.com\//.test(url); //must start with https://www.linkedin.com/
};

//real time listeners
function validateInput(input) {
    const errorSpan = input.nextElementSibling;

    if (input.checkValidity()) {
        errorSpan.textContent = "";
    } else {
        errorSpan.textContent = input.validationMessage || "Invalid Input";
    }
}

document.querySelectorAll('input').forEach(function(input) {
    input.addEventListener('input', function() {
        validateInput(input)
    })
})

document.getElementById('job-application').addEventListener('submit', function(event) {
    let valid = true;

    document.querySelectorAll('input').forEach(function(input) {
        validateInput(input);

        if(!input.checkValidity()) {
            valid = false;
        }
    })

    if (!valid) {
        event.preventDefault('');
        alert('Form is not valid');
    }
})

document.getElementById('phoneNumber').addEventListener('input', function () {
    const phoneError = document.getElementById('phoneNumberError');
    if (!validatePhone(this.value)) {
        phoneError.textContent = "Phone number must be 10 digits";
    } else {
        phoneError.textContent = "";
    }
});

document.getElementById('linkedin').addEventListener('input', function () {
    const linkedInError = document.getElementById('linkedinError');
    if (!validateLinkedIn(this.value)) {
        linkedInError.textContent = "LinkedIn URL must start with https://www.linkedin.com/";
    } else {
        linkedInError.textContent = "";
    }
});

if (!Element.prototype.closest) {
    Element.prototype.closest = function(selector) {
        let element = this;

        while (element && element.nodeType === 1) {
            if (element.matches(selector)) return element
            element = element.parentElement || element.parentNode
        }

        return null;
    }
}

// //event listener for validatePhone and validateLinkedIn
// document.getElementById('job-application').addEventListener('submit', function(event) {
//     //access the phone and phoneError elements
//     const phone = document.getElementById('phone').value;
//     const phoneError = document.getElementById('phoneError');

//     //access the linkedIn and linkedInError element
//     const linkedIn = document.getElementById('linkedin').value;
//     const linkedInError = document.getElementById('linkedinError');

//     let valid = true;

//     if (!validatePhone(phone)) {
//         phoneError.textContent = "Phone number must be 10 digits";
//         valid = false;
//     } else {
//         phoneError.textContent = "";
//     }

//     if (!validateLinkedIn(linkedIn)) {
//         linkedInError.textContent = "LinkedIn URL must start with https://www.linkedin.com/";
//         valid = false;
//     } else {
//         linkedInError.textContent = "";
//     }

//     if (!valid) {
//         event.preventDefault();
//     }
// })