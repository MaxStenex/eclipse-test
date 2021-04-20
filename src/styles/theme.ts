import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

// Пришлось создать тему, так как Реакт ругается на Select компонент из материал дизайна
// https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode
// Одно из решений убрать стрикт мод, но мне оно не понравилось

export const theme = createMuiTheme({});
