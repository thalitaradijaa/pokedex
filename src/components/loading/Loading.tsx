import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Box
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: `100vw`,
                height: `100vh`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '10010',
                backgroundColor: '#efefef80',
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default Loading;