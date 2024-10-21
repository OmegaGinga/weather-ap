// errorHandling.js

export function validateInput(input){
    const cityPattern = /^[a-zA-Z\s]+$/;
    const zipPattern = /^[\d]{5}\s[a-zA-Z]{2}$/;

    if(zipPattern.test(input)){
        return 'zipCode';
    }else if (cityPattern.test(input)){
        return 'city';
    }else{
        throw new Error('Invalid Input. Please enter a valid city name or zip code.');
    }
};