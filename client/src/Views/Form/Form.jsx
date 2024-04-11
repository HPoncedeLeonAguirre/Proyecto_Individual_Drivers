import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createDriverRequest } from '../../Redux/Actions/actions';
import {
    validateFields,
    validateDate,
    validateName,
    validateImage,
    validateTeams,
    existDriver,
    mayusFirstLetter,
    mayusFirstWord,
    dobFormat
} from './validations';

const Form = () => {
    const [forename, setForename] = useState("");
    const [surname, setSurname] = useState("");
    const [nationality, setNationality] = useState("");
    const [image, setImage] = useState("");
    const [dob, setDob] = useState("");
    const [description, setDescription] = useState("");
    const [teams, setTeams] = useState("");
    const [teamsApi, setTeamsApi] = useState("");
    const [forenameError, setForenameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [nationalityError, setNationalityError] = useState("");
    const [imageError, setImageError] = useState("");
    const [dobError, setDobError] = useState("");
    const [teamsError, setTeamsError] = useState("");
    const [fieldsError, setFieldsError] = useState("");

    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    useEffect
};

export default Form;