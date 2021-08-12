import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent : "space-between",
        fontFamily: "Roboto",
        backgroundColor: "#f6f6f6",
        maxWidth: "960px",
        height: "94vh",
        margin: "auto",
        padding :"20px"
    },
    messages :{
        flex: "9",
        display: "flex",
        flexDirection : "column",
        alignItems : "flex-start",
        overflow: "auto",
        gap: "10px",
        padding: "10px 10px",
        '&::-webkit-scrollbar': {
            //root element
            width: "8px",
        },
        '&::-webkit-scrollbar-button': {
            //side buttons
            display: "none"
        },
        '&::-webkit-scrollbar-thumb': {
            // slider
            backgroundColor: "#999",
            borderRadius: "20px"
        },
        '&::-webkit-scrollbar-thumb:hover': {
            
        },
        '&::-webkit-scrollbar-track': {
            // track
            backgroundColor: "#ccc",
            borderRadius: "20px"
        },
        '&::-webkit-scrollbar-corner': {
            // intersecting corner of both scrollbars
            display: "none"
        }

    },
    message: {
        backgroundColor: "lightskyblue",
        padding: "5px 10px",
        borderRadius: "11px",
        display: "flex",
        alignItems: "center",
        gap: "3px",
    },
    message_text: {
        fontWeight: "300"
    },
    bottom: {
        display: "flex",
        flexDirection: "column",
        flex: "1",
        gap: "10px",
        marginBottom: "20px"
    },
    replyBanner: {
        textTransform: "none",
        backgroundColor: "forestgreen",
        color: "#fff",
        fontWeight: "400",
        alignSelf: "center",
        padding: "1px 10px",
        borderRadius: "30px",
        '&:hover': {
            color: "black"
        }
    },
    type: {
        display: "flex",
        alignItems: "center",
    },
    input: {
        height: "38px",
        flex: "8",
        padding: "0px 10px",
        outline: "none",
        border: "1px solid ",
        borderRadius: "0px",
        '&:read-write': {
            fontFamily: "Roboto",
            fontSize: theme.spacing(2)
        },
        '&:focus': {
            border: "1px solid dodgerblue",
            boxShadow: "0 0 5px dodgerblue"
        }
    },
    button :{
        flex: "2",
        height: "40px",
        margin: "0px",
        borderRadius: "0px"
    }
}));

export default useStyles;