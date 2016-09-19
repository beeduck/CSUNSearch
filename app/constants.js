const URL = "http://curriculum.ptg.csun.edu/api/classes/";
const metadataURL = "http://curriculum.ptg.csun.edu/api/terms/Fall-2016/courses/*";

const TEMPLATE_CLASS_BOX_DISPLAY = "templates/classResultBox.html";
const TEMPLATE_SEARCH_RETURN_DISPLAY = "templates/searchReturn.html";

const ENTER_KEY = 13;

const courseTitleRegEx = '^(A\/R|AAS|ACCT|AE|AFRS|AIS' +
    '|AM|ANTH|ARAB|ARMN|ART|ASTR|ATHL|ATHS|BIOL|BLAW' +
    '|BUS|CADV|CAS|CD|CE|CECS|CHEM|CHIN|CHS|CIT|CLAS' +
    '|CM|CMT|COMP|COMS|CTVA|DEAF|ECE|ECON|EDUC|EED|ELPS' +
    '|ENGL|EOH|EPC|FCCA|FCFC|FCHC|FCS|FCSB|FCUD|FIN|FLIT' +
    '|FREN|GBUS|GEOG|GEOL|GWS|HEBR|HHD|HIST|HSCI|HUM|HUMA' +
    '|IS|ITAL|JAPN|JOUR|JS|KIN|KOR|LING|LRS|MATH|MCOM|ME' +
    '|MGT|MKT|MPA|MSE|MUS|NURS|PERS|PHIL|PHSC|PHYS|POLS' +
    '|PSY|PT|QS|RS|RTM|RUSS|SBS|SCI|SCM|SED|SOC|SOM|SPAN' +
    '|SPED|SUST|SWRK|TH|UDFC|UNIV|URBS|URBSFal)$';
