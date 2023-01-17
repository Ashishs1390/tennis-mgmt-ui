import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { styled } from '@mui/material/styles';
// import reducer from '../store';
// import Header from './ProductsHeader';
import Header from '../common-components/header/Header';
import VideoPlayerContainer from './player-container';
import useUserDetails from './../../custom-hooks/get-userDetails';
const Root = styled(FusePageCarded)(({ theme }) => ({
    '& .FusePageCarded-header': {
        minHeight: 72,
        height: 72,
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            minHeight: 136,
            height: 136,
        },
    },
    '& .FusePageCarded-content': {
        display: 'flex',
    },
    '& .FusePageCarded-contentCard': {
        overflow: 'hidden',
    },
}));

function VideoAnalysis() {
    const [playerName] = useUserDetails();
    const title = `Video Analysis for ${playerName}`
    // return <div>Video Analyaia page</div>
    return(<>
        <Root header={<Header title={title} />} content={<VideoPlayerContainer/> } innerScroll  />;
    </>)
    
   
}

export default VideoAnalysis;

// export default withReducer('eCommerceApp', reducer)(Products);
