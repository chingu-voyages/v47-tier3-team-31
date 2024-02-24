import { Box, Checkbox, FormControlLabel } from '@mui/material';

interface CheckboxGroupProps {
  state: { [key in string]: boolean }; // handles state of the checkboxes
  setStateFunction: React.Dispatch<React.SetStateAction<{ [key in string]: boolean }>>;
  dictionary: Record<any, string>; // This should hold reference to the readable name of whatever checkbox element is being used
  customStyles?: any;
}

export function CheckboxGroup({
  state,
  setStateFunction,
  dictionary,
  customStyles,
}: CheckboxGroupProps) {
  const handleCheckboxElementStatusChange = (event: { target: { name: any; checked: any } }) => {
    setStateFunction({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box className={customStyles}>
      {Object.entries(state).map(([element, checked]) => (
        <FormControlLabel
          key={element}
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxElementStatusChange}
              name={element}
            />
          }
          label={dictionary[element]}
        />
      ))}
    </Box>
  );
}
