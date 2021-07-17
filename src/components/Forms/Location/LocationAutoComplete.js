import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Input } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from '../../UI/Theme';
import { TextField } from "@material-ui/core";

export default function LocationAutoComplete(props) {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    props.onSelect(latLng, value);
  };

  return (
    <ThemeProvider theme={Theme}>
    <div>
      <PlacesAutocomplete
      key="12345"
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
             label="Address"
              fullWidth="true"
              id="outlined"
              {...getInputProps({})}
            />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#88BDC0" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
    </ThemeProvider>
  );
}
