import { Box } from '@mui/system'
import Skeleton from '@mui/material/Skeleton'

export const MyProfileSkeleton = () => {
    const skeleton = Array.from({ length: 2 }, (_, index) => (
        <div className='profileMiddleBlocks' key={index}>
            {index === 0 && <Skeleton variant="rectangular" width={130} height={130} sx={{ transform: 'none' }} />}
            <div className='eachProfileField'>
                <Box sx={{ pt: 0.5 }}>
                    <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                </Box>
            </div>
            <div className='eachProfileField'>
                <Box sx={{ pt: 0.5 }}>
                    <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                </Box>
            </div>
            <div className='eachProfileField'>
                <Box sx={{ pt: 0.5 }}>
                    <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                </Box>
            </div>
            <div className='eachProfileField'>
                <Box sx={{ pt: 0.5 }}>
                    <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                </Box>
            </div>
        </div>
    ))
    return (<>{skeleton}</>)
}