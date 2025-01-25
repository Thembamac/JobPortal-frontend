import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';

const Footer = () => {
   const { palette } = useTheme();
   return (
       <Box sx={{
           height: '60px',
           bgcolor: palette.secondary.midNightBlue,
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           bottom: 0,
           left: 0,
           right: 0,
           width: '100%',
           zIndex: 1000
       }}>
           <Box component='span' sx={{ color: palette.primary.main }}>
               © 2025 G1 Vision. All rights reserved
           </Box>
       </Box>
   )
}

export default Footer