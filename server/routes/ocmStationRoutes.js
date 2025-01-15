const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { maxResults, north, south, east, west } = req.query; //params from frontend?
    const response = await axios.get('https://api.openchargemap.io/v3/poi/', {
      params: {
        output: 'json',
        countrycode: 'FI',
        maxresults: 2000, //due to filtering, this number gets all the chargers in Finland but it's filtered later
        // compact: true,
        verbose: true,
      },
      headers: {
        'X-API-Key': process.env.OPEN_CHARGE_MAP_API_KEY,
      },
    });

    const formattedData = response.data
      .filter((item) =>
        item.Connections?.some(
          (
            connection //filtering out the connection types that are not useful for the project
          ) =>
            [2, 25, 27, 28, 30, 32, 33, 1036].includes(
              connection.ConnectionTypeID
            ) //30, 27 tesla; 32 type1; 33  css type2; 2 chademo; 25 type2 socket only; 28 type F slow charge; 1036 type 2 tethered
        )
      )
      .map((item) => ({
        id: item.ID || 'N/A',
        location: {
          title: item.AddressInfo?.Title || 'N/A',
          addressLine1: item.AddressInfo?.AddressLine1 || 'N/A',
          town: item.AddressInfo?.Town || 'N/A',
          postcode: item.AddressInfo?.Postcode || 'N/A',
          latitude: item.AddressInfo?.Latitude || 'N/A',
          longitude: item.AddressInfo?.Longitude || 'N/A',
        },
        usageType: {
          isPayAtLocation: item.UsageType?.IsPayAtLocation || false,
          isMembershipRequired: item.UsageType?.IsMembershipRequired || false,
          isAccessKeyRequired: item.UsageType?.IsAccessKeyRequired || false,
          isPublic: item.UsageType?.Title || false,
        },
        statusType: {
          isOperational: item.StatusType?.IsOperational || false,
          isUserSelectable: item.StatusType?.IsUserSelectable || false,
        },
        isRecentlyVerified: item.IsRecentlyVerified || false,
        dateLastVerified: item.DateLastVerified || 'N/A',
        usageCost: item.UsageCost || 'N/A',
        connections:
          item.Connections?.map((connection) => ({
            id: connection.ID || 'N/A',
            connectionTypeID: connection.ConnectionTypeID || 'N/A',
            powerKW: connection.PowerKW || 'N/A',
            level: connection.LevelID || 'N/A',
            quantity: connection.Quantity || 0,
            isFastChargeCapable: connection.Level?.IsFastChargeCapable || false,
            connectionType: connection.ConnectionType?.Title || 'N/A',
            formalName: connection.ConnectionType?.FormalName || 'N/A',
          })) || [],
      }));
    //for future use, when we want to filter out the stations not currently showing in map view. we can also use distance from the center point
    // .filter((station) => {
    //   const { latitude, longitude } = station.location;
    //   return (
    //     latitude >= parseFloat(south) &&
    //     latitude <= parseFloat(north) &&
    //     longitude >= parseFloat(west) &&
    //     longitude <= parseFloat(east)
    //   );
    // });

    //just for checking in console
    const uniqueStations = [
      ...new Map(
        formattedData.map((item) => [item.location.title, item])
      ).values(),
    ];
    console.log(`Unique Stations: ${uniqueStations.length}`);

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving charging points');
  }
});

router.get('/bookmarks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const idArray = id.split(',');
    const queryString = idArray.map(id => `id=${id}`).join('&');
    const response = await axios.get(
      `https://api.openchargemap.io/v3/poi/?${queryString}`,
      {
        params: {
          output: 'json',
          countrycode: 'FI',
          maxresults: idArray.length,
          verbose: true,
        },
        headers: {
          'X-API-Key': process.env.OPEN_CHARGE_MAP_API_KEY,
        },
      });
    const formattedData = response.data
      .filter((item) =>
        item.Connections?.some(
          (
            connection //filtering out the connection types that are not useful for the project
          ) =>
            [2, 25, 27, 28, 30, 32, 33, 1036].includes(
              connection.ConnectionTypeID
            ) //30, 27 tesla; 32 type1; 33 type2; 2 chademo; 25 type2 socket only; 28 type F slow charge; 1036 type 2 tethered
        )
      )
      .map((item) => ({
        id: item.ID || 'N/A',
        location: {
          title: item.AddressInfo?.Title || 'N/A',
          addressLine1: item.AddressInfo?.AddressLine1 || 'N/A',
          town: item.AddressInfo?.Town || 'N/A',
          postcode: item.AddressInfo?.Postcode || 'N/A',
          latitude: item.AddressInfo?.Latitude || 'N/A',
          longitude: item.AddressInfo?.Longitude || 'N/A',
        },
        usageType: {
          isPayAtLocation: item.UsageType?.IsPayAtLocation || false,
          isMembershipRequired: item.UsageType?.IsMembershipRequired || false,
          isAccessKeyRequired: item.UsageType?.IsAccessKeyRequired || false,
          isPublic: item.UsageType?.Title || false,
        },
        statusType: {
          isOperational: item.StatusType?.IsOperational || false,
          isUserSelectable: item.StatusType?.IsUserSelectable || false,
        },
        isRecentlyVerified: item.IsRecentlyVerified || false,
        dateLastVerified: item.DateLastVerified || 'N/A',
        usageCost: item.UsageCost || 'N/A',
        connections:
          item.Connections?.map((connection) => ({
            id: connection.ID || 'N/A',
            connectionTypeID: connection.ConnectionTypeID || 'N/A',
            powerKW: connection.PowerKW || 'N/A',
            level: connection.LevelID || 'N/A',
            quantity: connection.Quantity || 0,
            isFastChargeCapable: connection.Level?.IsFastChargeCapable || false,
            connectionType: connection.ConnectionType?.Title || 'N/A',
            formalName: connection.ConnectionType?.FormalName || 'N/A',
          })) || [],
      }));
    //for future use, when we want to filter out the stations not currently showing in map view. we can also use distance from the center point
    // .filter((station) => {
    //   const { latitude, longitude } = station.location;
    //   return (
    //     latitude >= parseFloat(south) &&
    //     latitude <= parseFloat(north) &&
    //     longitude >= parseFloat(west) &&
    //     longitude <= parseFloat(east)
    //   );
    // });

    //just for checking in console
    const uniqueStations = [
      ...new Map(
        formattedData.map((item) => [item.location.title, item])
      ).values(),
    ];
    console.log(`Unique Stations: ${uniqueStations.length}`);
    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving charging point');
  }
});

const providers = ["Neste", "ABC", "Recharge", "Helen", "Virta", "Tesla", "Lidl", "K-Lataus"];

const findProvider = (title) => {
  return providers.find((provider) => title.includes(provider)) || "Unknown";
};

const capitalizeString = (str) => {
  const loweredString = str.toLowerCase();
  const capitalizedString = loweredString.charAt(0).toUpperCase() + loweredString.slice(1);
  return capitalizedString;
};

router.get('/filters', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openchargemap.io/v3/poi/`,
      {
        params: {
          output: 'json',
          countrycode: 'FI',
          maxresults: 2000,
          verbose: true,
        },
        headers: {
          'X-API-Key': process.env.OPEN_CHARGE_MAP_API_KEY,
        },
      });
    const formattedData = response.data
      .filter((item) =>
        item.Connections?.some(
          (
            connection //filtering out the connection types that are not useful for the project
          ) =>
            [2, 25, 27, 28, 30, 32, 33, 1036].includes(
              connection.ConnectionTypeID
            ) //30, 27 tesla; 32 type1; 33 type2; 2 chademo; 25 type2 socket only; 28 type F slow charge; 1036 type 2 tethered
        )
      )
      .map((item) => ({
        id: item.ID || 'N/A',
        location: item.AddressInfo?.Town || 'N/A',
        title: item.AddressInfo?.Title || 'N/A',
        connector: item.Connections?.map((connection) => connection.ConnectionType?.Title || 'N/A') || [],
      }));
    const filterLocations = formattedData.map((item) => item.location).map(capitalizeString);
    const uniqueLocations = Array.from(new Set(filterLocations));
    const titles = formattedData.map((item) => item.title);
    const filterProviders = [];
    titles.forEach(element => {
      const provider = findProvider(element);
      filterProviders.push(provider);
    });
    const uniqueProviders = Array.from(new Set(filterProviders));

    const filters = {
      locations: uniqueLocations,
      providers: uniqueProviders,
      titles: titles,
      stations: formattedData,
    };
    res.json(filters);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving charging point');
  }
});

router.get('/customSearch/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = id;
    const response = await axios.get(
      `https://api.openchargemap.io/v3/poi/?${query}`,
      {
        params: {
          output: 'json',
          countrycode: 'FI',
          maxresults: 2000,
          verbose: true,
        },
        headers: {
          'X-API-Key': process.env.OPEN_CHARGE_MAP_API_KEY,
        },
      });
    const formattedData = response.data
      .filter((item) =>
        item.Connections?.some(
          (
            connection //filtering out the connection types that are not useful for the project
          ) =>
            [2, 25, 27, 28, 30, 32, 33, 1036].includes(
              connection.ConnectionTypeID
            ) //30, 27 tesla; 32 type1; 33 type2; 2 chademo; 25 type2 socket only; 28 type F slow charge; 1036 type 2 tethered
        )
      )
      .map((item) => ({
        id: item.ID || 'N/A',
        location: {
          title: item.AddressInfo?.Title || 'N/A',
          addressLine1: item.AddressInfo?.AddressLine1 || 'N/A',
          town: item.AddressInfo?.Town || 'N/A',
          postcode: item.AddressInfo?.Postcode || 'N/A',
          latitude: item.AddressInfo?.Latitude || 'N/A',
          longitude: item.AddressInfo?.Longitude || 'N/A',
        },
        usageType: {
          isPayAtLocation: item.UsageType?.IsPayAtLocation || false,
          isMembershipRequired: item.UsageType?.IsMembershipRequired || false,
          isAccessKeyRequired: item.UsageType?.IsAccessKeyRequired || false,
          isPublic: item.UsageType?.Title || false,
        },
        statusType: {
          isOperational: item.StatusType?.IsOperational || false,
          isUserSelectable: item.StatusType?.IsUserSelectable || false,
        },
        isRecentlyVerified: item.IsRecentlyVerified || false,
        dateLastVerified: item.DateLastVerified || 'N/A',
        usageCost: item.UsageCost || 'N/A',
        connections:
          item.Connections?.map((connection) => ({
            id: connection.ID || 'N/A',
            connectionTypeID: connection.ConnectionTypeID || 'N/A',
            powerKW: connection.PowerKW || 'N/A',
            level: connection.LevelID || 'N/A',
            quantity: connection.Quantity || 0,
            isFastChargeCapable: connection.Level?.IsFastChargeCapable || false,
            connectionType: connection.ConnectionType?.Title || 'N/A',
            formalName: connection.ConnectionType?.FormalName || 'N/A',
          })) || [],
      }));
    //for future use, when we want to filter out the stations not currently showing in map view. we can also use distance from the center point
    // .filter((station) => {
    //   const { latitude, longitude } = station.location;
    //   return (
    //     latitude >= parseFloat(south) &&
    //     latitude <= parseFloat(north) &&
    //     longitude >= parseFloat(west) &&
    //     longitude <= parseFloat(east)
    //   );
    // });

    //just for checking in console
    const uniqueStations = [
      ...new Map(
        formattedData.map((item) => [item.location.title, item])
      ).values(),
    ];
    console.log(`Unique Stations: ${uniqueStations.length}`);
    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving charging point');
  }
});


module.exports = router;
