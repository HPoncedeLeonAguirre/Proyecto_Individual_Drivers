import { all } from "axios";
import { searchDriverByName } from "../../Redux/Actions/actions";

const validateFields = (
    forename,
    surname,
    nationality,
    image,
    dob,
    description,
    teams
) => {
    return (
        !forename ||
        !surname ||
        !nationality ||
        !image ||
        !dob ||
        !description ||
        !teams
    );
};

const validateDate = (dob) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if(!dateRegex.test(dob)){
        return false;
    }
    const [day, month, year] = dob.split("/").map(Number);
    if(
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12 ||
        year > 1 ||
        year > 2024
    ) {
        return false;
    }
    return true;
};

const validateName = (forename, surname) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(forename) && nameRegex.test(surname);
};

const validateImage = (image) => {
    const imageFormat = image.split(".").pop().toLowerCase();
    return imageFormat === "jpg" || imageFormat === "jpeg";
};

const validateTeams = (teams, allTeams) => {
    if(!teams){
        return false;
    }
    if(!allTeams || allTeams.length === 0){
        return true;
    }
    const arrayTeams = teams.split(",").map((team) => team.trim().toLowerCase());
    const toLowerCaseAllTeams = allTeams.map((team) => team.toLowerCase());
    return arrayTeams.every((team) => toLowerCaseAllTeams.includes(team));
};

const existDriver = async (forename, surname) => {
    try{
        const existDataDriver = await searchDriverByName(`${forename} ${surname}`)();
        return !!existDataDriver;
    } catch (error) {
        return false;
    }
};

const mayusFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const mayusFirstWord = (str) => {
    const words = str.split(' ');
    if(words.length > 0){
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
    return words.join(" ");
};

const dobFormat = (input) => {
    const cleanedInput = input.replace(/[^\d]/g, "");
    const truncatedInput = cleanedInput.substring(0, 8);
    const formattedInput = truncatedInput.split('').map((char, index) => {
        if(index === 2 || index === 4) return '/' + char;
        return char;
    }).join("");
    return formattedInput;
};

export {
    validateFields,
    validateDate,
    validateName,
    validateImage,
    validateTeams,
    existDriver,
    mayusFirstLetter,
    mayusFirstWord,
    dobFormat
};