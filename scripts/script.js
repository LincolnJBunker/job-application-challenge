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

    if (input.id === "phoneNumber") { //if the user is inputting their phone number, use validatePhone function
        if (validatePhone(input.value)) {
            errorSpan.textContent = ""; //valid input, clear the error
        } else {
            errorSpan.textContent = "Phone number must be 10 digits"; //invalid input, alert the user of the error
        }
    } else if (input.id === "linkedin") { //if the user is inputting their LinkedIn, use validateLinkedIn function
        if (validateLinkedIn(input.value)) {
            errorSpan.textContent = ""; //valid input, clear the error
        } else {
            errorSpan.textContent = "LinkedIn URL must start with https://www.linkedin.com/"; //invalid input, alert the user of the error
        }
    } else if (input.checkValidity()) {
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

//event listener for when submit is clicked
document.getElementById('job-application').addEventListener('submit', function(event) {
    let valid = true; //variable for valid input

    try {
        document.querySelectorAll('input').forEach(function(input) { //loop through each input filed
            validateInput(input); //validate the input
            if(!input.checkValidity()) {
                valid = false; //set valid to false if not valide
            }
        })

        if (!valid) {
            event.preventDefault();
            alert('Please fix errors or fill in the missing fields before submitting');
        }
        
    } catch (error) {
        event.preventDefault();
        alert('An error occured: ', error.message); //alert the user of the error
    }
})

//event listener for when reset is clicked
document.getElementById('job-application').addEventListener('reset', function(event) {

    try {
        document.querySelectorAll('input').forEach(function(input) { //loop through each input filed
            input.value = ""; //reset all fields
        })
        document.querySelectorAll('.error').forEach(function(span) {
            span.textContent = ''; //reset all error messages, if any
        });
    } catch (error) {
        event.preventDefault();
        alert('An error occured while trying to reset fields: ', error.message); //alert the user of the error
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