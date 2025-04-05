import React from 'react';
import { Matcher } from '../utlity/Match';
import SelectorComponent from './SelectorComponent';

const Dupli = ({ cacheData, value1, value1Utility, value2, value2Utility }) => {
    console.log("Here from SDD by APP. Transforming data into json and objects");

    const IDS_GEOLOCATION_OPTION = cacheData.IDS_GEOLOCATION.map(country =>
        Matcher(Object.values(country)[0], 'geolocation', Object.keys(country)[0])
    );

    const IDS_APPLICATION_OPTION = cacheData.IDS_APPLICATIONS.map(appli =>
        Matcher(appli.shortName, 'application', appli.appId)
    );

    const IDS_HOST_OPTION = cacheData.IDS_HOST.map(host =>
        Matcher(host, 'host', host)
    );

    const IDS_HOST_GROUP_OPTION = cacheData.IDS_HOST_GROUP.map(host_group =>
        Matcher(host_group.hostGroupName, 'hostGroupName', host_group.hostGroup)
    );

    const IDS_PORT_OPTION = cacheData.IDS_PORT.map(port =>
        Matcher(port, 'port', port)
    );

    // Structure the data as an object
    const options = {
        "host":IDS_HOST_OPTION,
        "hostGroupName":IDS_HOST_GROUP_OPTION,
        "geolocation":IDS_GEOLOCATION_OPTION,
    };

    const utility = {
        "application":IDS_APPLICATION_OPTION,
        "port":IDS_PORT_OPTION
    }

    return (
        <>
            <SelectorComponent options={options} utility={utility}  value1={value1} value1Utility={value1Utility} value2={value2} value2Utility={value2Utility}/>
        </>
    );
};

export default Dupli;
