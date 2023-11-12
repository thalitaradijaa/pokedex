import React, { ReactNode } from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    IconButton,
    PaletteMode,
    Stack,
    ThemeProvider,
    Toolbar,
    Typography,
    createTheme
} from "@mui/material";

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import logo from '../../assets/logo.png';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    const { children } = props;
    const [mode, setMode] = React.useState<PaletteMode>('dark');

    const defaultTheme = createTheme({
        palette: {
            mode: mode
        },
    });

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Stack flexDirection="row">
                        <Typography variant="h6" color="inherit" noWrap fontWeight={500}>
                            Pokédex
                        </Typography>
                        <img src={logo} alt="" style={{width:40}} />
                    </Stack>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <main>
                <Box
                    sx={{
                        paddingBlock: 8,
                        paddingInline: { xs: 2, sm: 12, md: 12, lg: 24, },
                        overflow: 'auto',
                        height: "calc(100vh - 64px)"
                    }}
                >
                    {children}
                </Box>
            </main>
        </ThemeProvider>
    )
}