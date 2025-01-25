import React, { useRef, useState, useEffect } from 'react';
import { Card, Stack, Typography, Button, TextField, Container, CardContent } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { userApplyJobAction } from '../redux/actions/userAction';
import LoadingBox from '../component/LoadingBox';
import { useNavigate, useParams } from 'react-router-dom';
import { jobLoadSingleAction } from '../redux/actions/jobAction';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { useTheme } from '@emotion/react';

const SingleJob = () => {
   const { palette } = useTheme();
   const dispatch = useDispatch();
   const { singleJob, loading } = useSelector(state => state.singleJob);
   const { id } = useParams();
   const form = useRef();
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [loadingEmail, setLoading] = useState(false);
   const [thankYouVisible, setThankYouVisible] = useState(false);

   useEffect(() => {
       dispatch(jobLoadSingleAction(id));
   }, [id, dispatch]);

   const sendEmail = (e) => {
       e.preventDefault();
       setLoading(true);

       const templateParams = {
           email: email,
           jobTitle: singleJob?.title || 'Job Position',
       };

       fetch('https://formspree.io/f/xzzdzbdz', {
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(templateParams),
       })
       .then((response) => {
           if (response.ok) {
               setThankYouVisible(true);
               applyForAJob();
           } else {
               alert('Error sending application');
           }
       })
       .catch((error) => {
           console.error('Error:', error);
           alert('Error sending application');
       })
       .finally(() => {
           setLoading(false);
       });
   };

   const applyForAJob = () => {
       dispatch(userApplyJobAction({
           title: singleJob?.title,
           description: singleJob?.description,
           salary: singleJob?.salary,
           location: singleJob?.location,
       }));
   };

   return (
       <Box sx={{ bgcolor: "#fafafa" }}>
           <Navbar />
           {thankYouVisible && (
               <Box 
                   sx={{ 
                       position: 'fixed',
                       top: '50%',
                       left: '50%',
                       transform: 'translate(-50%, -50%)',
                       bgcolor: 'white',
                       p: 3,
                       boxShadow: 5,
                       borderRadius: 2,
                       zIndex: 1000,
                       width: '90%',
                       maxWidth: '400px',
                       textAlign: 'center'
                   }}
               >
                   <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                       Thank you!
                   </Typography>
                   <Typography variant="body1" sx={{ mb: 2 }}>
                       Your application was sent successfully.
                   </Typography>
                   <Button 
                       onClick={() => navigate('/')} 
                       variant="contained" 
                       fullWidth
                       sx={{ 
                           textTransform: 'none',
                           bgcolor: '#ff9800',
                           '&:hover': {
                               bgcolor: '#e68a00'
                           }
                       }}
                   >
                       OK
                   </Button>
               </Box>
           )}
           <Box sx={{ height: '85vh' }}>
               <Container sx={{ pt: '30px' }}>
                   <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                       <Box sx={{ flex: 4, p: 2 }}>
                           {loading ? <LoadingBox /> :
                               <Card sx={{ bgcolor: palette.primary.white }}>
                                   <CardContent>
                                       <Typography variant="h5" component="h3">
                                           {singleJob && singleJob.title}
                                       </Typography>
                                       <Typography variant="body2">
                                           <Box component="span" sx={{ fontWeight: 700 }}>Salary</Box>: R{singleJob && singleJob.salary}
                                       </Typography>
                                       <Typography variant="body2">
                                           <Box component="span" sx={{ fontWeight: 700 }}>Category</Box>: {singleJob && singleJob.jobType ? singleJob.jobType.jobTypeName : "No category"}
                                       </Typography>
                                       <Typography variant="body2">
                                           <Box component="span" sx={{ fontWeight: 700 }}>Location</Box>: {singleJob && singleJob.location}
                                       </Typography>
                                       <Typography variant="body2" sx={{ pt: 2 }}>
                                           {singleJob && singleJob.description}
                                       </Typography>
                                   </CardContent>
                               </Card>
                           }
                       </Box>
                       <Box sx={{ flex: 1, p: 2 }}>
                           <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                               <form ref={form} onSubmit={sendEmail}>
                                   <Stack spacing={2}>
                                       <TextField
                                           name="email"
                                           label="Your Email"
                                           type="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           required
                                       />
                                       <Button 
                                           type="submit"
                                           sx={{ fontSize: "13px" }}
                                           variant='contained'
                                           disabled={loadingEmail}
                                       >
                                           Apply for this job
                                       </Button>
                                   </Stack>
                               </form>
                           </Card>
                       </Box>
                   </Stack>
               </Container>
           </Box>
           <Footer />
       </Box>
   );
};

export default SingleJob;