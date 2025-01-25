import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';

const Footer = () => {
   const { palette } = useTheme();
   return (
       <Box sx={{
           height: '40px',
           bgcolor: palette.secondary.midNightBlue,
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           position: 'fixed', 
           bottom: 0,
           left: 0,
           right: 0,
           width: '100%',
           zIndex: 1000
       }}>
           <Typography 
               variant="body2" 
               sx={{ 
                   color: palette.primary.main,
                   fontSize: '12px',
                   fontWeight: 700
               }}
           >
               © 2025 G1 Vision. All rights reserved
           </Typography>
       </Box>
   )
}

export default Footer