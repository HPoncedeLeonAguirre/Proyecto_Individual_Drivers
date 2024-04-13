import { clusterDriversFilter, sortDrivers } from "../Actions/actions.js";

import {
    SEARCH_DRIVERS,
    FETCH_DRIVERS,
    RETRIEVE_DRIVER_BY_ID,
    PAGINATE,
    ORDER_BY_DOB,
    ORDER_BY_NAME,
    FILTER,
    CREATE_DRIVER_REQUEST,
    CREATE_DRIVER_SUCCESS,
    CREATE_DRIVER_ERROR
} from "../Actions/actions-types.js";

let initialState = {
    drivers: [],
    allDrivers: [],
    driver: {},
    loading: false,
    error: null,
    currentPage: 1,
    driversPerPage: 9,
    selectedOrder: "name",
    selectedDirection: "ASC",
    filter: {
        origin: "all",
        teams: "all",
    }
};

const rootReducer = (state = initialState, action) => {
    let searchFilteredDrivers;
    let searchOrderedFilteredDrivers;
    let newDrivers;
    let clusteredDrivers;
    let sortedDriversByName;
    let sortedDriversByDob;
    let allDrivers;

    switch (action.type) {
        case SEARCH_DRIVERS:
            searchFilteredDrivers = action.payload.filter((driver) => 
                state.drivers.every((existDriver) => existDriver.id !== driver.id)
            );

            searchOrderedFilteredDrivers = sortDrivers(
                searchFilteredDrivers,
                state.selectedOrder,
                state.selectedDirection
            );
            
            newDrivers = [
                ...searchOrderedFilteredDrivers.filter((driver) => 
                !state.drivers.some((existDriver) => existDriver.id === driver.id)),
                ...state.drivers,
            ];

            clusteredDrivers = clusterDriversFilter(
                state.allDrivers,
                newDrivers,
                state.selectedOrder,
                state.selectedDirection
            );

            const newState = {
                ...state,
                drivers: newDrivers,
                allDrivers: clusteredDrivers
            };
            return newState;

        case FETCH_DRIVERS:
            if(state.drivers.length === 0) {
                return {
                    ...state,
                    drivers: action.payload,
                    allDrivers: action.payload,
                    loading: false
                };
            } else {
                return {
                    ...state,
                    loading: false
                };
            };
        case RETRIEVE_DRIVER_BY_ID:
            return {
                ...state,
                driver: action.payload,
                loading: false,
                error: null
            };
        case PAGINATE:
            return {
                ...state,
                currentPage: action.payload.page,
                driversPerPage: action.payload.driversPerPage
            };
        case ORDER_BY_NAME:
            sortedDriversByName = sortDrivers(
                state.allDrivers,
                "name",
                action.payload
            );
            return {
                ...state,
                selectedOrder: "name",
                selectedDirection: action.payload,
                allDrivers: sortedDriversByName
            };
        case ORDER_BY_DOB:
            sortedDriversByDob = sortDrivers(
                state.allDrivers,
                "dob",
                action.payload
            );
            return {
                ...state,
                selectedOrder: "dob",
                selectedDirection: action.payload,
                allDrivers: sortedDriversByDob
            };
        case FILTER:
            const { teams, origin } = action.payload
            if(teams !== "all") {
                allDrivers = state.drivers.filter((driver) => {
                    return (
                        driver && ((Array.isArray(driver?.Teams) && driver.Teams.some((team) => 
                        team.name === teams)) || (typeof driver.teams === "string" && 
                        driver.teams.split(", ").includes(teams)))
                    );
                });
            } else {
                allDrivers = state.drivers;
            };
            if(origin === "API") {
                allDrivers = allDrivers.filter((driver) => driver && driver.driverRef);
            } else if (origin === "DB") {
                allDrivers = allDrivers.filter((driver) => driver && !driver.driverRef);
            };
            allDrivers = sortDrivers(
                allDrivers,
                state.selectedOrder,
                state.selectedDirection
            );
            return {
                ...state,
                filter: {
                    ...state.filter,
                    teams: action.payload.teams,
                    origin: action.payload.origin
                },
                allDrivers: allDrivers
            };
        case CREATE_DRIVER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_DRIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case CREATE_DRIVER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    };
};

export default rootReducer;