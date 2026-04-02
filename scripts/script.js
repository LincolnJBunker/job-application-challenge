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

//function for validating inputted fields
const validateInput = (input) => {
    const errorSpan = input.nextElementSibling; //target the error element

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
    } else if (input.checkValidity()) { //if not a phone number or LinkedIn, use checkValidity()
        errorSpan.textContent = ""; //valid input, clear the error
    } else {
        errorSpan.textContent = input.validationMessage || "Invalid Input"; //invalid input, alert the user of the error
    }
}

//event listner for displaying real time feedback to the user
document.querySelectorAll('input').forEach(function(input) {
    input.addEventListener('input', function() { //loop through each input element
        validateInput(input); //call validateInput, feedback provided for each field
    })
})

//event listener for when submit is clicked
document.getElementById('job-application').addEventListener('submit', function(event) {
    let valid = true; //variable for valid input

    try {
        document.querySelectorAll('input').forEach(function(input) { //loop through each input filed
            validateInput(input); //validate the input
            //run specific checks on phone number and LinkedIn, call their respective functions
            if (input.id === "phoneNumber") {
                if (!validatePhone(input.value)) {
                    valid = false;
                }
            }
            if (input.id === "linkedin") {
                if (!validateLinkedIn(input.value)) {
                    valid = false
                }
            }
            //if not phone number or LinkedIn, use checkValidity()
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