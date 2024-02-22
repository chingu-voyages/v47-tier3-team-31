import { Box, Checkbox, FormControlLabel } from '@mui/material';

interface CheckboxGroupProps {
  checkBoxElementsStatus: { [key in string]: boolean }; // handles state of the checkboxes
  setCheckboxElementsStatus: React.Dispatch<React.SetStateAction<{ [key in string]: boolean }>>;
  referenceDictionary: Record<any, string>; // This should hold reference to the readable name of whatever checkbox element is being used
  customStyles?: any;
}

export function CheckboxGroup({
  checkBoxElementsStatus,
  setCheckboxElementsStatus,
  referenceDictionary,
  customStyles,
}: CheckboxGroupProps) {
  const handleCheckboxElementStatusChange = (event: { target: { name: any; checked: any } }) => {
    setCheckboxElementsStatus({
      ...checkBoxElementsStatus,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box className={customStyles}>
      {Object.entries(checkBoxElementsStatus).map(([element, checked]) => (
        <FormControlLabel
          key={element}
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxElementStatusChange}
              name={element}
            />
          }
          label={referenceDictionary[element]}
        />
      ))}
    </Box>
  );
}
